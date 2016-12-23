angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicActionSheet, $timeout, User, Task, ionicToast) {

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
    var payload =  {
        "title": $scope.newNote.title,
        "body": $scope.newNote.body,
        "token": $scope.token
      }
      Task.create(payload,
        function(response){
          //Get all tasks from server
          getTasks();
          //reset $scope.note to init values
          $scope.newNote = {};
          toast("Syncing Note with the Server");
          }, function(err){
               toast("Error, Note Could Not be Added. Please try Again Later.");
      });

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
            toast("Entered Email address or Password are incorrect. Please try again.");
            break;
          case 412:
            toast("Please enter an email address and password and try again.");
            break;
          case 500:
            toast("Could not find your account. Please enter your credentials again.");
            break;
          default:
            toast("An error occured processing your request to the server. Please try again.");
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
      //storing token from server into browser
      localStorage.setItem("token", response.token);
      getTasks();
    }, function(err) {
        switch(err.status){
          case 406:
            toast("Entered Email address is not valid. Please enter a valid Email address.");
            break;
          case 409:
            toast("Entered Email has already been registerd. Please enter another Email address.");
            break;
          case 412:
            toast("Entered Email address and Password were not entered successfully. Please enter them again.");
            break;
          case 500:
            toast("We could not save your account. Please try again.");
            break;
          default:
            toast("An error occured processing your request to the server. Please try again.");
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
  //***************Note Action Sheet*********************
  //*******************************************************

  // Triggered on a button click, or some other target
   $scope.showActionSheet = function() {

     // Show the action sheet
     var hideSheet = $ionicActionSheet.show({
       buttons: [
         { text: '<i class="icon ion-upload"></i><b>Save Note</b>' },
         { text: '<i class="icon ion-archive"></i><b>Archive Note</b>' },
         { text: '<i class="icon ion-refresh"></i><b>Restore Note from Archives</b>'},
         { text: '<i class="icon ion-trash-b"></i><b>Delete Note</b>'}
       ],
      //  destructiveText: 'Delete',
       titleText: 'Modify Your Note',
       cancelText: 'Cancel',
       cancel: function() {
            // add cancel code..
          },
       buttonClicked: function(index) {
         return true;
       }
     });

     // For example's sake, hide the sheet after two seconds
     $timeout(function() {
       hideSheet();
     }, 10000);

   };

  //*******************************************************
  //*******************************************************
  //*******************************************************
  //*******************************************************

  //retrieves tasks
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
//gets tasks on page load
function onpageLoad(){
  if($scope.token){
    getTasks();
  }
}

//generic toast notifications
function toast(message){
  //message is string, boolean for a button to close the toast, and milliseconds for timeout
  ionicToast.show(message, 'bottom', false, 4000);
}

})
