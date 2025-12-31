#!/usr/bin/env python3

import json
import os
import requests
import sys
import re
import jinja2

from datetime import datetime

from github import Github

# Authentication is defined via github.Auth
from github import Auth

# using an access token
token = os.environ.get("GITHUB_TOKEN")
auth = Auth.Token(token) if token else None

URL = "https://update.k3s.io/v1-release/channels"
HEADERS = {"accept": "application/json"}
FILE = "k3s-versions.json"
REPO = "k3s-io/k3s"
GITHUBRELEASES = f"https://github.com/{REPO}/releases/tag/"

OUTPUTFILE = "data/k3s.json"

def main():
	# Open the previous json data
	try:
		with open(FILE) as json_file:
				previous = json.load(json_file)
	except Exception:
			previous = {}

	# Get the URL
	try:
		page = requests.get(URL, headers=HEADERS)
		page.raise_for_status()
	except requests.exceptions.HTTPError as err:
		raise SystemExit(err)
	
	# Convert it to a dict directly as it is json
	try:
		data = page.json()
	except requests.exceptions.JSONDecodeError as err:
		raise SystemExit(err)
	
	# If the data didn't changed, exit soon
	# Note: checking if GITHUB_TOKEN is present to force run if needed for testing?
	# No, relying on standard logic.
	if data == previous:
		print("CHANGED=false")
		sys.exit(0)
	# Otherwise, save it for the future
	else:
		print("CHANGED=true")
		with open(FILE, "w") as json_file:
			json_file.write(json.dumps(data, sort_keys=True))

	k3sversions = {"k3s-versions": [], "date": datetime.now().strftime("%d/%m/%Y %H:%M:%S")}

	if auth:
		g = Github(auth=auth)
	else:
		g = Github()

	repo = g.get_repo(REPO)

	# Optimization: Fetch all releases once to avoid rate limits and improve performance
	# There are many releases, so this might take a bit, but it is better than fetching per channel
	# We only need the title, prerelease status, and published date.
	# Getting all releases might still hit limits if there are thousands.
	# But checking the original logic: it filtered `releases` (the PaginatedList) multiple times.
	# Converting to list here is the safest way to avoid multiple API calls during the loop.
	releases = list(repo.get_releases())

	ordereddata = data["data"][:3] + sorted(data["data"][3:], key=lambda d: d['name'], reverse=True)
	for key in ordereddata:
		# Some releases (k3s 1.16-testing & 1.17-testing don't have a latest version, skipping them
		if 'latest' in key:
			previous_versions = []

			# key['latest'] is something like "v1.30.14+k3s2" or "v1.18.2-rc3+k3s1"
			# key['latest'][:6] takes the first 6 chars.
			search_pattern = re.escape(key['latest'][:6])

			for i in list(filter(lambda r: re.match(search_pattern, r.title), releases)):
				previous_versions.append({
					"version": i.title,
					"github-release-link": f"{GITHUBRELEASES}{i.title}",
					"prerelease": i.prerelease,
					"released": i.published_at.strftime("%d/%m/%Y %H:%M:%S")
				})

			version = {
				"name": key['name'],
				"version": key['latest'],
				"github-release-link": f"{GITHUBRELEASES}{key['latest']}",
				"all-versions": previous_versions
			}
			k3sversions['k3s-versions'].append(version)

			try:
				release = repo.get_release(key['latest'])
				with open("data/"+key['latest']+".md", "w") as releasefile:
					releasefile.writelines(["---\n",
												f"version: {key['latest']}\n",
												f"releaseDate: {release.published_at.strftime('%d/%m/%Y %H:%M:%S')}\n",
												"---\n"])
					releasefile.write(release.body or '')
			except Exception as e:
				print(f"Warning: Could not get release details for {key['latest']}: {e}")
				# If we can't get the specific release details, we might want to continue
				# instead of failing the whole script.

	g.close()

	with open(OUTPUTFILE, "w") as json_file:
		json_file.write(json.dumps(k3sversions, sort_keys=True))

if __name__ == "__main__":
    main()
