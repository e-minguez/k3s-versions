#!/usr/bin/env python3

import json
import os
import requests
import sys

import jinja2
# import semantic_version

from datetime import datetime
# from natsort import natsorted

URL = "https://update.k3s.io/v1-release/channels"
HEADERS = {"accept": "application/json"}
FILE = "k3s-versions.json"
HTML = "k3s-index.html"
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

	templates_dir = os.path.join(
		os.path.dirname(os.path.realpath(__file__)), "templates"
	)
	
	file_loader = jinja2.FileSystemLoader(templates_dir)
	env = jinja2.Environment(loader=file_loader)
	template = env.get_template("index.template")

	stable = next(item for item in data["data"] if item["name"] == "stable")["latest"]
	latest = next(item for item in data["data"] if item["name"] == "latest")["latest"]
	testing = next(item for item in data["data"] if item["name"] == "testing")["latest"]

	mod_date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

	with open(HTML, "w") as output_file:
			output_file.write(
					template.render(
							title=TITLE,
							disclaimer=DISCLAIMER,
							stable=stable,
							latest=latest,
							testing=testing,
							mod_date=mod_date,
					)
			)

if __name__ == "__main__":
    main()