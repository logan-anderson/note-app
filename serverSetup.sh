#!/bin/sh
# Update Packages
sudo apt update
sudo apt upgrade -y

# SERVER SETUP
# install all the packages we need
sudo apt install nodejs npm  nginx build-essential -y

# test to make sure node and npm where installed
if ! node -v ; then
    echo Nodejs was not installed
    exit 1
fi

if ! npm -v ; then
    echo npm was not installed
    exit 1 
fi

# setup Nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'OpenSSH'
sudo ufw enable



# setup 