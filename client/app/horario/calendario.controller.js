'use strict';

angular.module('finalnodeApp').controller('CalendarioCtrl', function($scope, $http, $location, $routeParams, Auth, moment) {
    var URI_HORARIO = '/api/horarios/';

    $scope.calendarView = 'month';
    $scope.calendarDate = new Date();
    $scope.calendarTitle = "Calendario";

    $scope.horarios = [];

    $scope.events = [
        {
        title: 'My event title', // The title of the event
        type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
        startsAt: new Date(2016,20,4,15), // A javascript date object for when the event starts
        endsAt: new Date(2017,8,26,15), // Optional - a javascript date object for when the event ends
        editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
        deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
        draggable: true, //Allow an event to be dragged and dropped
        resizable: true, //Allow an event to be resizable
        incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
        recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
        cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
  }
];


    (function main() {
	    $http.get(URI_HORARIO).success(function(horarios) {
	        $scope.horarios = horarios;

	        var size = $scope.horarios.length;
        	
        	for (var i = 0; i < size ; i++) {
                if($scope.horarios[i].recurso == $routeParams.idRecurso) {
                    $scope.events.push({title: $scope.horarios[i].descricao , type: 'important', 
                        startsAt: $scope.horarios[i].data, endsAt: $scope.horarios[i].data, draggable: true, resizable: true})
                }
         };
	    });



})();

});
