#Required: inotify-tools
#TODO: check if no argument 

#content=$(echo $1 | sed "s/-----/<\/section><section data-markdown>/g" )
#cat $1 | sed "s/-----/bla/g")
tmpdir=/tmp/slide$(date +%s |md5sum |cut -d ' ' -f 1)
trap "echo 'Cleaning up...'; rm -r $tmpdir; exit" SIGINT SIGQUIT

if [ $# -eq 0  ]
then
  echo "No markdown file specified."
  echo "Usage: md2reveal.sh <md-file>"
  exit
fi
echo "md to reveal.js compiler started"
script_dir=${0%/*}
pushd $script_dir

cp -r . $tmpdir
popd

cp $1 $tmpdir/tmp.md
#echo "$content"
pushd $tmpdir
sed -e "/Your content will be here./r tmp.md" -e "//d" $tmpdir/template.html> $tmpdir/$1.html 
echo "Compiled $1 to $1.html"
popd

firefox $tmpdir/$1.html

while true 
do 
  inotifywait -e close_write $1 
  cp $1 $tmpdir/tmp.md
  pushd $tmpdir
  sed -e "/Your content will be here./r tmp.md" -e "//d" $tmpdir/template.html> $tmpdir/$1.html 
  echo "Compiled $1 to $1.html"
  popd
done

#This has a big limitation: if some program replaces myfile.py with a different file, rather than writing to the existing myfile, inotifywait will die. Most editors work that way.

#To overcome this limitation, use inotifywait on the directory:

#while true; do
#   change=$(inotifywait -e close_write,moved_to,create .)
#     change=${change#./ * }
#    if [ "$change" = "myfile.py" ]; then ./myfile.py; fi
# done

