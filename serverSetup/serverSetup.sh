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
    exit $?
fi

if ! npm -v ; then
    echo npm was not installed
    exit $? 
fi

# setup Nginx
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'OpenSSH'
sudo ufw enable



# setup 
npm install
sudo npm install pm2@latest -g
pm2 start ./bin/www
pm2 startup systemd
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp /home/$USER
pm2 save
sudo systemctl start pm2-$USER
systemctl status pm2-$USER
sudo cp list.logananderson.ca  /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/list.logananderson.ca /etc/nginx/sites-enabled/

sudo nano /etc/nginx/nginx.conf
# uncomment a certen line
sudo sed -i 's/# server_names_hash_bucket_size 64;/server_names_hash_bucket_size 64;/' /etc/nginx/nginx.conf

sudo nginx -t
sudo systemctl restart nginx
