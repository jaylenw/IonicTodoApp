# IonicTodoApp

Website version of this app found [here](https://github.com/jaylenw/AngularJsTodoApp).

#Under Development

Note: Depending on stage of the project and particular issue, the backend must be running properly to test certain features. Information on setting up the backend is below.

## Build, Testing, & Development

1. Need to have [Nodejs](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Ionic](http://ionicframework.com/), and [Bower](https://bower.io/) installed on your system globally. If running a Debian/Ubuntu system and you do not have the packages installed globaly, run these commands below: 

        sudo apt-get update  
        sudo apt-get install nodejs  
        sudo ln -s /usr/bin/nodejs /usr/bin/node  
        sudo apt-get install npm 
        sudo npm install -g npm
        sudo npm install -g bower
        sudo npm install -g ionic

2. Clone this repo.

3. In the root of the project folder, run `npm install` and `bower install`.

4. Run `ionic serve` for live preview. You can then browse the site after opening your browser to the url that ionic has informed you, usually `http://localhost:8100`.


### Setting up the Backend

Note: Change the javascript files in /www/js/services/, task.js and user.js to have your url and port number
   that will be directing requests to your backend. Do not change anything after the port number. Forever (server we will be using) by defualt listens to port 3000. Replace "yourdomain.com" with the domain you will be using. It will look like this, "http://yourdomain.com/3000"

1. The backend for this app is found here at this repo: https://github.com/julianpoy/jaylenBackend

2. To run the backend, first clone the repo above. Second, install forever from npm globally, `npm install forever -g`. You may    need to run `sudo npm install forever -g` if on Ubuntu/Debian. 
   You can use [forever](https://www.npmjs.com/package/forever) to run the backend server and autorestart it.

3. Next, install mongodb on your system globally and have it running. If on a Ubuntu/Debian system, you would run 
   `sudo apt-get install mongodb`.

4. After having cloned the repo linked above and are in the root of the folder, run `npm install && bower install`. 

5. Use forever to start the server, run `forever start bin/www`.

6. You should now be able to get and post tasks to the server after registering an account through your site. 

--------------------------------------------------------------------------------------------------------------

Pull requests and issues are welcomed.
