#!/bin/bash

echo "are you sure you want to run the LL computer setup scripts? (y/n)"
read AREYOUSURE
if [[ $AREYOUSURE =~ ^[Yy]$ ]]
then

  echo "start with homebrew & git and the rest of 01_start.sh? (y/n)"
  read BREW_CHOICE
  if [[ $BREW_CHOICE =~ ^[Yy]$ ]]
  then
    echo "installing homebrew"
    xcode-select --install
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    echo "homebrew installed"
    echo "installing git"
    brew install git
    echo "git installed"
    cd ~
    mkdir Development
    cd Development
    echo "cloning the scripts"
    git clone https://github.com/mkuzmick/thescripts.git
    cd thescripts/macsetup/scripts
    BASHPROFILE_PATH=~/.bash_profile
    cd ../..
    ROOT_SCRIPTS_DIR=$(pwd)
    cd ex
    SCRIPTS_DIR=$(pwd)
    echo "going to add to ${SCRIPTS_DIR}"
    # echo "export PATH=/usr/local/bin:${SCRIPTS_DIR}:\$PATH" >> ~/.bash_profile
    echo "export PATH=/usr/local/bin:${SCRIPTS_DIR}:\$PATH" >> $BASHPROFILE_PATH
    echo "PS1='\W \$ '" >> $BASHPROFILE_PATH
  else
    echo "ok--we are going to assume that you have all the scripts in"
    echo "~/Development/thescripts/macsetup/scripts"
    echo "if not you may want to force quit."
  fi
  echo "do you want to run the 02_mainbrew.sh script?"
  read BREW_REPLY
  if [[ $BREW_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./02_mainbrew.sh
    else
      echo "won't run 02_mainbrew.sh"
  fi
  echo "do you want to run the 03_preferences.sh script?"
  read PREF_REPLY
  if [[ $PREF_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./03_preferences.sh
    else
      echo "won't run 03_preferences.sh"
  fi
  echo "do you want to run the 04_fonts.sh script?"
  read PREF_REPLY
  if [[ $PREF_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./04_fonts.sh
    else
      echo "won't run 04_fonts.sh"
  fi
  echo "do you want to run the 05_extras.sh script?"
  read PREF_REPLY
  if [[ $PREF_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./05_extras.sh
    else
      echo "won't run 05_extras.sh"
  fi
  echo "do you want to run the 06_npm.sh script?"
  read PREF_REPLY
  if [[ $PREF_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./06_npm.sh
    else
      echo "won't run 06_npm.sh"
  fi
  echo "do you want to run the 07_atom.sh script?"
  read PREF_REPLY
  if [[ $PREF_REPLY =~ ^[Yy]$ ]]
    then
        cd ~/Development/thescripts/macsetup/scripts
        ./07_atom.sh
    else
      echo "won't run 07_atom.sh"
  fi
else
  echo "ok. ending now."
  exit 0
fi



#
#     BREW_CHOICE=read -p "do you want to run 02_brew.sh? " -n 1 -r
#     echo    # (optional) move to a new line
#     if [[ $BREW_CHOICE =~ ^[Yy]$ ]]
#     then
#       echo "ok-running 02.brew.sh"
#       chmod 755 02_brew.sh
#       ./02_brew.sh
#     else
#       echo "ok-ending now."
#       exit 0
#     fi
#   else
#     echo "ok. ending now."
# else
#   echo "ok. ending now."
#   exit 0
# fi
