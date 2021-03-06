# List Tracking App

This is a simple list tracking app that was made in some of my free time when I did not have school work. This idea of this app was to get familiar with nodejs, express and passport.js as well as practice my backend skills. The Idea for the app came to me when I needed a place for my family to store and look at christmas lists online.

This project as for most of my recent projects I try to follow to the [git-flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) practices 

## Stack

This app uses a pretty simple stack

* Nodejs
* Express
* Mongodb
* Passport for user authentication
* Mongoose for database interactions
* EJS for making html templates that are rendered on the server side



## Server setup (currently offline)

I used digital ocean for a VM. I used pm2 (node package) and nginx to deploy the app on a server. I used these two resources to help me

* [Nginx](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
* [Seting up a NodeJs App for Production](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)


# Setup for Local Development
## Running the App

first clone this repo and install the packages

* `git clone git@github.com:logan-anderson/note-app.git`
* `cd note-app`
* `npm install`
* install nodemon globally for dev mode `sudo npm install nodemon -g`

you can run the app by enter the following

* dev mode: `npm run dev`
* prod mode: `npm run start`

## Database Setup

You can use mongodb cloud services by making [an account](https://www.mongodb.com/) and pasting the uri or add your password and username into the credentials.js file. Alternatively, you can install mongodb on your machine and set [the useLocal flag to true](https://docs.mongodb.com/manual/administration/install-on-linux/)

### example of a credentials/credentials.js

``` javascript
module.exports = {
    local: false,
    useUri: false,
    uri: '',
    userName: 'username',
    password: 'pass',
    clusterName: '',
    dev: 'dev',
    prod: 'prod',
}
```

you can get a credential template in the correct directory by running init.sh

## Run Linter

* `npx eslint . --fix`
