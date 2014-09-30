script_dir=${0%/*}
pushd $script_dir

source config.sh
dboxpublic=$HOMEDIR/Dropbox/Public

tmpdir=$dboxpublic/slides$(date +%s%N |md5sum |cut -c 1-6)
cp -r . $tmpdir
popd

cp $1 $tmpdir/tmp.md
#echo "$content"
pushd $tmpdir
sed -e "/Your content will be here./r tmp.md" -e "//d" $tmpdir/template.html> $tmpdir/$1.html 
popd

echo "Your slides is published to ",
echo "$DBOXPREFIX/$tmpdir/$1.html"

