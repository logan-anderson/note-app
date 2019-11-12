# List tracker app

I made this simple app in some of my free time when I did not have school work. This idea of this app was to get fermilular for nodejs and express and practice my backend skills. I made this app so that my family had has a place to store and look at each other christmas lists (please don't delete them).

## stack

This app uses a pretty simple stack

* Nodejs
* Express
* mongodb
* uses ejs and mongoose node packages

## running the app

first clone this repo and install the packages

* `git clone git@github.com:logan-anderson/note-app.git`
* `npm install`

you can run the app by enter the following

* `DEBUG=note-app:* npm start`

or you can use nodemon for hot reload capability

* `sudo npm install nodemon -g`
* `nodemon` (This will now run the app)

## server setup

I used digital ocean for a VM. I  used pm2 (node package) and nginx to deploy the app on a server. I used these two resources to help me

* <https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04>
* <https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04>