#!/usr/bin/env python3

import json
import os
import requests
import sys
import re
import jinja2

from datetime import datetime


URL = "https://update.k3s.io/v1-release/channels"
HEADERS = {"accept": "application/json"}
FILE = "k3s-versions.json"
HTML = "k3s-index.html"
GITHUBRELEASES = "https://github.com/k3s-io/k3s/releases/tag/"
RELEASENOTES = "https://docs.k3s.io/release-notes/"
VERSIONSWITHRELEASENOTES = ["v1.24","v1.25","v1.26","v1.27","v1.28"]
OUTPUTFILE = "k3s.json"

TITLE = "K3s versions"
DISCLAIMER = """
<p>This is an unofficial source</p>
<p>Please visit <a href="https://docs.k3s.io/">the official site</a>
to get more information</p>
"""

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
		sys.exit("CHANGED=false")
	# Otherwise, save it for the future
	else:
		print("CHANGED=true")
		with open(FILE, "w") as json_file:
			json_file.write(json.dumps(data, sort_keys=True))

	k3sversions = {"k3s-versions": [], "date": datetime.now().strftime("%d/%m/%Y %H:%M:%S")}

	for key in data["data"]:
		ghr = GITHUBRELEASES+key['latest']

		if key['name'] in VERSIONSWITHRELEASENOTES:
			normalizedversion = re.sub('[^A-z0-9 -]', '', key['latest']).replace(" ", " ")
			rn = RELEASENOTES+key['name']+".X#release-"+normalizedversion

		elif key['name'] in ["stable","latest"]:
			v = key['latest'].rsplit('.',1)[0]
			normalizedversion = re.sub('[^A-z0-9 -]', '', key['latest']).replace(" ", " ")
			rn = RELEASENOTES+v+".X#release-"+normalizedversion

		else:
			rn = ""

		version = {"name": key['name'], "version": key['latest'], "github-releases": ghr, "release-notes": rn }
		k3sversions['k3s-versions'].append(version)

	with open(OUTPUTFILE, "w") as json_file:
		json_file.write(json.dumps(k3sversions, sort_keys=True))

if __name__ == "__main__":
    main()