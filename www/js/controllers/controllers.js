angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User, Task, ionicToast) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  //initializing empty note
  $scope.newNote = {};

  //Initializing our user object
  $scope.user = {};

  //Initializing our user token
  $scope.token = localStorage.getItem("token");

  //on Page load get the tasks
  onpageLoad();

  //*******************************************************
  //*******************************************************
  //**********NEW NOTE MODAL*******************************
  //*******************************************************

  // Create the new note modal that we will use later
  $ionicModal.fromTemplateUrl('templates/new-note.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.noteModal = modal;
  });

  // Triggered in the new note modal to close it
  $scope.closeCreateNote = function() {
    $scope.noteModal.hide();
  };

  // Open the create note modal
  $scope.createNote = function() {
    $scope.noteModal.show();
  };

  // Perform the create new note action when the user submits the note form
  $scope.doCreateNote = function() {
    console.log('Created note', $scope.newNote);
    $scope.newNote.archive = false;
    //adding new note to notes array
    $scope.notes.push($scope.newNote);

    // Simulate a created note delay.
    $timeout(function() {
      $scope.closeCreateNote();
    }, 1000);
  };

  //*******************************************************
  //*******************************************************
  //************LOGIN MODAL********************************
  //*******************************************************

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the create modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var payload = {
      email: $scope.user.email,
      password: $scope.user.password
    }
    User.login(payload, function(response){
      //storing token from server into browser
      localStorage.setItem("token", response.token);
      //obtain tasks from server
      getTasks();
    }, function(err){

        switch (err.status) {
          case 401:
            ngNotify.set('Entered Email address or Password are incorrect. Please try again.', 'error');
            break;
          case 412:
            ngNotify.set('Please enter an email address and password and try again.', 'error');
            break;
          case 500:
            ngNotify.set('Could not find your account. Please enter your credentials again.', 'error');
            break;
          default:
            ngNotify.set('An error occured processing your request to the server. Please try again.', 'error');
        }
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //*******************************************************
  //*******************************************************
  //************Register MODAL*****************************
  //*******************************************************

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the create modal
  $scope.register = function() {
    $scope.registerModal.show();
  };

  // Perform the register action when the user submits the login form
  $scope.doRegister = function() {
    var payload = {
      email: $scope.user.email,
      password: $scope.user.password
    }
    User.register(payload, function(response) {
      ngNotify.set('You are now Registered.', 'success');
      //storing token from server into browser
      localStorage.setItem("token", response.token);
    }, function(err) {
        switch(err.status){
          case 406:
            ngNotify.set(' Entered Email address is not valid. Please enter a valid Email address.', 'error');
            break;
          case 409:
            ngNotify.set('Entered Email has already been registerd. Please enter another Email address.', 'error');
            break;
          case 412:
            ngNotify.set('Entered Email address and Password were not entered successfully. Please enter them again.', 'error');
            break;
          case 500:
            ngNotify.set('We could not save your account. Please try again.', 'error');
            break;
          default:
            ngNotify.set('An error occured processing your request to the server. Please try again.', 'error');
        }
    });

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeRegister();
    }, 1000);
  };

  //*******************************************************
  //*******************************************************
  //*******************************************************
  //*******************************************************

  function getTasks(){
    Task.get(
      {
        "token": $scope.token
      },
      function(response){
        $scope.notes = response;
        toast("Successfully Synced Notes with the Server");
      },
      function(err){
        switch(err){
          case 500:
            toast("Error Occured Connecting with the Server");
          break;
        }
      }

    )
  };

function onpageLoad(){
  if($scope.token){
    getTasks();
  }
}

function toast(message){
  //message is string, boolean for a button to close the toast, and milliseconds for timeout
  ionicToast.show(message, 'bottom', false, 4000);
}

})
