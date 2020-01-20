# IonicTodoApp

Website version of this app found [here](https://github.com/jaylenw/AngularJsTodoApp). Desktop version of this app is found [here](https://github.com/jaylenw/ElectronTodoApp).

This project is designed to work with the backend application, [Nota](https://github.com/jaylenw/nota).

## Description

Users are able to use this App as a Todo-List or a Note Taking application.

## Features

* User Login, Logout, & Registration
* Add, Edit, Delete, and Archive Notes
* Supports Markdown
* Built for Android

## Build, Testing, & Development

1. Need to have [Nodejs](https://nodejs.org/en/), [NPM](https://www.npmjs.com/), [Ionic](http://ionicframework.com/), and [Bower](https://bower.io/) installed on your system globally. This guide assumes you are running a 16.04 LTS 64bit Ubuntu system. If running a Debian/Ubuntu system and you do not have the packages installed globaly, run these commands below:

        sudo apt update
        sudo apt install git
        sudo curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -  
        sudo apt install nodejs  
        sudo ln -s /usr/bin/nodejs /usr/bin/node
        sudo npm install -g bower
        sudo npm install -g ionic@1.7.16
        sudo npm install -g cordova@6.2.0
        sudo apt install openjdk-8-jdk
        sudo dpkg --add-architecture i386
        sudo apt install libdb1-compat tzdata initscripts
        sudo apt install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1
        sudo apt install zlib1g-dev libncurses5-dev
        sudo apt install zlib1g:i386

2. Clone this repo.

3. In the root of the project folder, run `npm install` and `bower install`.

4. Run `ionic serve` for live preview. You can then browse the site after opening your browser to the url that ionic has informed you, usually `http://localhost:8100`. If behind a proxy run `ionic serve -a`.

Optional: If you would like to have a web optimized build for deployment, as if you want to put it on a web server or use it in [Electron](http://electron.atom.io/), run `gulp build-web`. The folder `www-dist` will have optimized files for deployment.

## Building Android APK

Use android studio to manage sdks, it can be found [here](https://developer.android.com/studio/index.html).

Download it and extract it.

Navigate to android-studio/bin/ directory, and execute studio.sh

Follow the instructions to install the latest SDK.

Set the path
`nano ~/.bashrc`

Add the lines below to nano. Note to put the path to the contents Android studio has
downloaded for your ANDROID_HOME path.

`export ANDROID_HOME=your-path-of-contents-android-studio-download`

`export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools`

Exit out of nano

`cd`

`source ~/.bashrc`    

Next close your terminal and reopen it to the directory of this project.

Run `cordova platform add android`.

Run `cordova plugin add cordova-plugin-whitelist`.

Run `cordova prepare`.

Download the old SDK tools [here](https://dl.google.com/android/repository/tools_r25.2.3-linux.zip).
Replace the current `tools` folder in your `~/Android/Sdk` with the one we downloaded.
This is necessary as the `android` CLI no longer supports this version of Cordova.

Run `ionic build android`.
If you run into an error that prevents you from downloading the gradle package due,
to a proxy issue or some other 403 error, please do the following using your browser:

Download `https://services.gradle.org/distributions/gradle-2.2.1-all.zip`
Place the downloaded gradle zip into a directory. Set up a local proxy or even
a simple server with Python on port 80 and change to your hosts file so that
when you visit `http://services.gradle.org/distributions/gradle-2.2.1-all.zip`, you
will be hitting your own computer.

You could also change the Android SDK/platform version by view the highest number
of platform installed by going to `your-path-of-contents-android-studio-download/platforms`.
For this case, we will target Android version 23.

You may confirm the following in two files of our Ionic app directory:
`IonicTodoApp/latforms/android/project.properties`

        target=android-23

and

`IonicTodoApp/platforms/android/CordovaLib/project.properties`

         # Project target.
	       target=android-23

Also the manifest:

`IonicTodoApp/platforms/android/platforms/AndroidManifest.xml`

`<uses-sdk android:minSdkVersion="16" android:targetSdkVersion="23" />`

At the root of the project run `ionic build android`
You will then find a debugging apk in `platforms/android/build/outputs/apk/`
The debugging apk can be installed with no issues by installation from `unknown sources`.

Run `ionic build android --release` to get the production ready apk. You may install it
on your Android devices but it must be signed or you will encounter an error.
You will find an unsigned apk in `IonicTodoApp/platforms/android/build/outputs/apk/`.

If you want to push your app to the Google Play store, follow the instructions
[here](http://ionicframework.com/docs/guide/publishing.html).

Note: If for some reason you encounter a build error with a `java.io.FileNotFoundException`,
run `ionic build android` or `ionic build android --release` one more time and the build
process will correct itself.

If you would like to change the application's icon and images, do so in the
`resources` folder.


### Connecting to the Backend

Note: Change the javascript file in `/www/js/services/`, `config.js`, to have your
url and/or port number that will be directing requests to your backend for the
`_apiUrl` variable. Replace the value with whatever you will be using.

The backend for this app is found here at this repository: https://github.com/jaylenw/nota

--------------------------------------------------------------------------------------------------------------

Pull requests and issues are welcomed.
