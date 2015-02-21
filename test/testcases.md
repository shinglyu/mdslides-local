TEST THAT The slides can be served locally

WHEN Create a folder

WHEN run mdslides init
THEN a template.md and pic/ should be created

WHEN run mdslides s template.md
THEN a firefox will pop up with the slides opened

WHEN go through the pages
THEN all pages should look good

WHEN press ESC
THEN a zoomed out view will appear

WHEN press "->" and "<-" to move, then press ESC
THEN should go back to the page in the middle

---------------------------------------

TEST THAT The slides can be deployed to the public

WHEN Create a folder

WHEN run mdslides init
THEN a template.md and pic/ should be created

WHEN run mdslides deploy
THEN You'll get a link

WHEN Open the link after dropbox synced
THEN You'll see the slides

WHEN go through the pages
THEN all pages should look good

WHEN press ESC
THEN a zoomed out view will appear

WHEN press "->" and "<-" to move, then press ESC
THEN should go back to the page in the middle

----------------------------

TEST THAT Verify the HTML title and dir title

-----------------------------

TEST THAT Slides update when md file updates
