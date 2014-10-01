script_dir=${0%/*}
pushd $script_dir

source config.sh
dboxpublic=$HOMEDIR/Dropbox/Public

tmpdir=slides$(date +%s%N |md5sum |cut -c 1-6)
fulltmpdir=$dboxpublic/$tmpdir
rsync -r --exclude=.git --exclude=*.sh . $fulltmpdir
popd

cp $1 $fulltmpdir/tmp.md
cp -r pic $fulltmpdir/pic;
#echo "$content"
pushd $fulltmpdir
sed -e "/Your content will be here./r tmp.md" -e "//d" $fulltmpdir/template.html> $fulltmpdir/$1.html 
popd

echo "Your slides are published to:"
echo "$DBOXPREFIX/$tmpdir/$1.html"

