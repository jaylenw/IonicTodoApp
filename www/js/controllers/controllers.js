angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, User, Task, ngNotify) {

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
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.notes = [
    {
      title: 'Reggae',
      body: 'Body 1',
      archive: false
    },
    {
      title: 'Chill',
      body: 'Body 2',
      archive: false
    },
    {
      title: 'Dubstep',
      body: 'Body 3',
      archive: false
    },
    {
      title: 'Indie',
      body: 'Body 4',
      archive: false
    },
    {
      title: 'Rap',
      body: 'Body 5',
      archive: true
    },
    {
      title: 'Cowbell',
      body: 'Body 6',
      archive: true
    }
  ];
})
