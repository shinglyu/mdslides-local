#!/bin/bash
sudo apt-get update;
sudo apt-get install realpath inotify-tools;
scriptdir=$(realpath ${0%/*});
#shrc=$HOME'/.bashrc'
shrc=$HOME'/.zshrc'

echo 'export PATH=$PATH:"'$scriptdir'"'|tee -a $shrc;
echo "Added $scriptdir to PATH variable"
echo "Remember to run 'source $shrc' or restart the terminal"
