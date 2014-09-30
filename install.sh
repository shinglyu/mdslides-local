#!/bin/bash
#sudo apt-get update;
#sudo apt-get install realpath inotify-tools;
scriptdir=$(realpath ${0%/*});
bashrc='~/.bashrc'

echo 'export PATH=$PATH:"'$scriptdir'"'>> $bashrc;
echo "Added $scriptdir to PATH variable"
echo "Remember to run 'source $bashrc' or restart the terminal"
