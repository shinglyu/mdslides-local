# Mdslides - local edition

Creating HTML5 presentations using markdown syntax, no server needed.

## Installation
* Edit ``config.sh``  to add your dropbox link prefix.
* Run ``install.sh``


## Usage

```
Usage: mdslides <action> [<md-file>]
 
Actions:
init   or i  create a template.md file
serve  or s  serve the specified md file using local server
deploy or d  deploy to dropbox
help   or h  print this helpful message

```
* Create your presentation content as a markdown file, or use `mdslides init` to create a template.
* Run ``mdslides s <markdown file>`` to view it locally.
* ``mdslides`` will monitor the markdown file for changes, when you saved your markdown file, refresh the browser.
* Press <kbd>ctrl</kbd>+<kbd>c</kbd> to stop ``mdslides``.
* Run ``mdslides d <markdown file>`` to deploy your slides to dropbox.

## Online Version
You may also check the [online version](http://mdslides.herokuapp.com).

## Special Thanks
This work is based on [reveal.js](https://github.com/hakimel/reveal.js/)
