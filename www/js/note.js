angular.module('starter.controllers')
  .controller('NoteCtrl', function($scope, $stateParams) {
    $scope.note = $scope.notes[$stateParams.noteId];
});
