#!/bin/bash

NAME_PROJECT="jaylenw/IonicTodoApp"

clear
echo " ------------------ $NAME_PROJECT  ------------------ "

echo "Fetches the list of available updates ..."
sudo apt update

echo "Installing git ..."
if [ "`dpkg -s git | grep "installed"`" = "" ]; then
  sudo apt install git -y
  echo "git installed!"
else
  echo "git is already installed!";
fi

echo "Installing Node.js ..."
if [ "`dpkg -s nodejs | grep "installed"`" = "" ]; then
  sudo apt install nodejs -y
  echo "Configuring Node.js ..."
  sudo ln -s /usr/bin/nodejs /usr/bin/node
  echo "Node.js installed!"
else
  echo "Node.js is already installed!";
fi

echo "Installing npm ..."
if [ "`dpkg -s npm | grep "installed"`" = "" ]; then
  sudo apt install npm -y
  echo "npm installed!"
else
  echo "npm is already installed!";
fi

echo "Installing npm packages ...."
sudo npm install -g npm

echo "Installing bower packages ...."
sudo npm install -g bower

echo "Installing ionic@1.7.16 ...."
sudo npm install -g ionic@1.7.16

echo "Installing openjdk-8-jdk ..."
sudo apt install openjdk-8-jdk -y

echo "Configuring architecture i386 ..."
sudo dpkg --add-architecture i386

echo "Installing libraries ..."
sudo apt install libdb1-compat tzdata initscripts -y
sudo apt install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 -y
sudo apt install zlib1g-dev libncurses5- -y
sudo apt install zlib1g:i386 -y

echo "Installing npm dependencies ...."
npm install

echo "Installing bower dependencies ...."
bower install

echo "Finish!"
exit 0;
