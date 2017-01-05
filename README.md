# IonicTodoApp

Website version of this app found [here](https://github.com/jaylenw/AngularJsTodoApp). Desktop version of this app is found [here](https://github.com/jaylenw/ElectronTodoApp).

This repo is designed for you to deploy your own backend and edit the necessary files here to work with it. However, I will soon provide a production version of this by providing an Android APK where anyone may install it, sign up, and use it themselves.

##Description

Users are able to use this App as a Todo-List or a Note Taking application.

##Features

* User Login, Logout, & Registration
* Add, Edit, Delete, and Archive Notes
* Supports Markdown
* Built for Android

## Build, Testing, & Development

1. Need to have [Nodejs](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Ionic](http://ionicframework.com/), and [Bower](https://bower.io/) installed on your system globally. This guide assumes you are running a 16.04 LTS 64bit Ubuntu system. If running a Debian/Ubuntu system and you do not have the packages installed globaly, run these commands below:

        sudo apt update  
        sudo apt install nodejs  
        sudo ln -s /usr/bin/nodejs /usr/bin/node  
        sudo apt install npm
        sudo npm install -g npm
        sudo npm install -g bower
        sudo npm install -g ionic@1.7.16
        sudo apt install openjdk-8-jdk
        sudo dpkg --add-architecture i386

2. Clone this repo.

3. In the root of the project folder, run `npm install` and `bower install`.

4. Run `ionic serve` for live preview. You can then browse the site after opening your browser to the url that ionic has informed you, usually `http://localhost:8100`.

Optional: If you would like to have a web optimized build for deployment, as if you want to put it on a web server or use it in [Electron](http://electron.atom.io/), run `gulp build-web`. The folder `www-dist` will have optimized files for deployment.

##Building Android APK

Download the Android SDK, run this command in your home directory
`wget http://dl.google.com/android/android-sdk_r24.2-linux.tgz`

`tar -xvf android-sdk_r24.2-linux.tgz`
`cd android-sdk-linux/tools`

Install all sdk packages
`./android update sdk --no-ui`

Set the path
`nano ~/.bashrc`

Add the line below to nano.

`export ANDROID_HOME=~/android-sdk-linux`
`export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`

Exit out of nano

`cd`

`source ~/.bashrc`

For adb

        sudo apt install libdb1-compat tzdata initscripts
        sudo apt install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1

For aapt

        sudo apt install zlib1g-dev libncurses5-dev
        sudo apt install zlib1g:i386

Next close your terminal and reopen it to the directory of this project.

run `ionic build android`.

If you get an error saying you have not accepted the license agreement,
install the platform and accept the license like this

`android update sdk -u -a -t <platform number>`

You could also change the Android SDK/platform version by view the highest number
of platform installed by going to `~/android-sdk-linux/platforms`. Noting the highest
version number, in this particular example, 23, make these changes below in these files.
This should be done in two files:
`myApp/platforms/android/project.properties` and
`myApp/platforms/android/CordovaLib/project.properties`

         # Project target.
	       target=android-23

`myApp/platforms/android/project.properties myApp/platforms/android/CordovaLib/project.properties`

Also the manifest should be updated:

`myApp/platforms/android/platforms/AndroidManifest.xml`

`<uses-sdk android:minSdkVersion="14" android:targetSdkVersion="23" />`

At the root of the project run `ionic build android`
You will then find a debugging apk in `platforms/android/build/outputs/apk/`

Run `ionic build android --release` to get the production ready apk. You may install it
on your Android devices using the installation from unknown sources option in
your android device. You will find an unsigned apk in `platforms/android/build/outputs/apk/`.

If you want to push your app to the Google Play store, follow the instructions
[here](http://ionicframework.com/docs/guide/publishing.html).

If you would like to change the application's icon and images, do so in the
`resources` folder.


### Setting up the Backend

Note: Change the javascript file in /www/js/services/, config.js,  to have your url and port number
   that will be directing requests to your backend for the `_apiUrl` variable. Do not change anything after the port number. Forever (server we will be using) by defualt listens to port 3000. Replace "yourdomain.com" with the domain you will be using. It will look like this, "http://yourdomain.com/3000"

1. The backend for this app is found here at this repo: https://github.com/jaylenw/ToDoBackend

2. To run the backend, first clone the repo above. Second, install forever from npm globally, `npm install forever -g`. You may    need to run `sudo npm install forever -g` if on Ubuntu/Debian.
   You can use [forever](https://www.npmjs.com/package/forever) to run the backend server and autorestart it.

3. Next, install mongodb on your system globally and have it running. If on a Ubuntu/Debian system, you would run
   `sudo apt install mongodb`.

4. After having cloned the repo linked above and are in the root of the folder, run `npm install && bower install`.

5. Use forever to start the server, run `forever start bin/www`.

6. You should now be able to get and post tasks to the server after registering an account through your site.

7. If you need to kill `forever` for any reasons, run `forever list`. You will then see a list of all `forever` processes. Kill the `forever` process you want
by identifying the `pid` and killing it by running `forever stop pidNUM` where pidNUM is the pid number is the process you would like to kill.

--------------------------------------------------------------------------------------------------------------

Pull requests and issues are welcomed.
