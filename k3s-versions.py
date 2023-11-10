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
auth = Auth.Token(os.environ["GITHUB_TOKEN"])

URL = "https://update.k3s.io/v1-release/channels"
HEADERS = {"accept": "application/json"}
FILE = "k3s-versions.json"
GITHUBRELEASES = "https://github.com/k3s-io/k3s/releases/tag/"
REPO = "k3s-io/k3s"

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
	if data == previous:
		print("CHANGED=false")
		sys.exit(0)
	# Otherwise, save it for the future
	else:
		print("CHANGED=true")
		with open(FILE, "w") as json_file:
			json_file.write(json.dumps(data, sort_keys=True))

	k3sversions = {"k3s-versions": [], "date": datetime.now().strftime("%d/%m/%Y %H:%M:%S")}

	g = Github(auth=auth)
	repo = g.get_repo(REPO)

	ordereddata = data["data"][:3] + sorted(data["data"][3:], key=lambda d: d['name'], reverse=True)

	for key in ordereddata:
		ghr = GITHUBRELEASES+key['latest']
		version = {"name": key['name'], "version": key['latest'], "github-release-link": ghr }
		k3sversions['k3s-versions'].append(version)

		release = repo.get_release(key['latest'])

		with open("data/"+key['latest']+".md", "w") as releasefile:
			releasefile.writelines(["---\n",
										 f"version: {key['latest']}\n",
										 f"releaseDate: {release.published_at.strftime('%d/%m/%Y %H:%M:%S')}\n",
										 "---\n"])
			releasefile.write(release.body)

	g.close()

	with open(OUTPUTFILE, "w") as json_file:
		json_file.write(json.dumps(k3sversions, sort_keys=True))

if __name__ == "__main__":
    main()