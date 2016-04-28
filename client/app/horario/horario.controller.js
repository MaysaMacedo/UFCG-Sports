'use strict';

angular.module('finalnodeApp').controller('HorarioCtrl', function($scope, $http, $location, $routeParams, Auth, moment) {
    var URI_HORARIO = '/api/horarios/';
    var URI_RECURSO = '/api/recursos/';

    var self = this;

    var count = 1;

    // CALENDARIO

//     $scope.calendarView = 'month';
//     $scope.calendarDate = new Date();
//     $scope.calendarTitle = "TESTE";


//     $scope.events = [
//         {
//         title: 'My event title', // The title of the event
//         type: 'info', // The type of the event (determines its color). Can be important, warning, info, inverse, success or special
//         startsAt: new Date(2016,20,4,15), // A javascript date object for when the event starts
//         endsAt: new Date(2017,8,26,15), // Optional - a javascript date object for when the event ends
//         editable: false, // If edit-event-html is set and this field is explicitly set to false then dont make it editable.
//         deletable: false, // If delete-event-html is set and this field is explicitly set to false then dont make it deleteable
//         draggable: true, //Allow an event to be dragged and dropped
//         resizable: true, //Allow an event to be resizable
//         incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
//         recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
//         cssClass: 'a-css-class-name' //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
//   }
// ];


//     $scope.eventClicked = function(event) {
//       confirm("Tem certeza que deseja deletar?")
//     };

//     $scope.eventEdited = function(event) {
//       confirm("Tem certeza que deseja deletar?")
//     };

//     $scope.eventDeleted = function(event) {
//       confirm("Tem certeza que deseja deletar?")
//     };

    $scope.isAdmin = Auth.isAdmin;

    $scope.horarios = [];
    $scope.recursos = [];

    $scope.horariosVazio = function() {
        return $scope.horarios.length === 0;
    };

    $scope.delete = function(recurso) {
        if (confirm("Tem certeza que deseja deletar?")) {
            $http.delete(URI_HORARIO + recurso._id);
            $scope.horarios = []
            $http.get(URI_HORARIO).success(function(horarios) {
                $scope.horarios = horarios;
            });
        }
    };

    // Criar e editar recurso
    
    var amanha = new Date;
    amanha.setDate(amanha.getDate() + 1);

    $scope.horario = {
        data: amanha,
        duracao: 1.5
    };

    $scope.recurso = {};

    $scope.errors = {};

    // $scope.populaEvento = function(recurso) {

    //     console.log(recurso._id);
    //     var size = $scope.horarios.length;
    //     console.log(size);
    //     for (var i = 0; i < size ; i++) {
    //             if($scope.horarios[i].recurso == recurso._id) {
    //                 console.log("eh igual");
    //                 $scope.events.push({title: $scope.horarios[i].descricao , type: 'important', 
    //                     startsAt: $scope.horarios[i].data, endsAt: $scope.horarios[i].data, draggable: true, resizable: true})
    //             }
    //      };
    //      console.log($scope.events);

    // }

    $scope.submiterForm = function(form) {
        if ($routeParams.id) {
            self.salvarHorario(form);
        } else {
            self.criarHorario(form);
        }
    }

    this.salvarHorario = function(form) {
        if ($scope.horario.nome === '') {
            return;
        }
        $http.put(URI_HORARIO + $scope.horario._id, $scope.horario).then(function() {
            $location.path('/horario')
        }).catch(function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });
    };

    this.criarHorario = function(form) {
        if ($scope.horario.nome === '') {
            return;
        }
        $scope.horario.recurso = $routeParams.idRecurso;
        $http.post(URI_HORARIO, $scope.horario).then(function() {
            $location.path('/horario')
        }).catch(function(err) {
            err = err.data;
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });
    };

    $scope.adicionaEvento = function(data,descricao) {
        
         var d = new Date(data);
         console.log("ENTROOOOOU");
        $scope.events.push({title: descricao , type: 'important', startsAt: d, endsAt: d, draggable: true, resizable: true})


    }

    $scope.getDiaDaSemana = function(data) {
        var d = new Date(data);
        var weekday = new Array(7);
        weekday[0] = "Domingo";
        weekday[1] = "Segunda-Feira";
        weekday[2] = "Terça-Feira";
        weekday[3] = "Quarta-Feira";
        weekday[4] = "Quinta-Feira";
        weekday[5] = "Sexta-Feira";
        weekday[6] = "Sábado";

        return weekday[d.getDay()];
    };

    $scope.formatarHora = function(hora) {
        var data = new Date();
        var minutos = 60 * (hora % 1);
        data.setHours(hora, minutos);
        return data.getHours()+":"+data.getMinutes('mm');
    };

    (function main() {
        $http.get(URI_HORARIO).success(function(horarios) {
            $scope.horarios = horarios;
        });

        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursos = recursos;
        });

        if ($routeParams.id) {
            $http.get(URI_HORARIO + $routeParams.id).success(function(horario) {
                $scope.horario = horario;
            });
        }

        if ($routeParams.idRecurso) {
            $http.get(URI_RECURSO + $routeParams.idRecurso).success(function(recurso) {
                $scope.recurso = recurso;

            });
            // $scope.events.push({title: $scope.horario.descricao , type: $scope.horario.descricao, 
            //             startsAt: $scope.horario.data, endsAt: $scope.horario.data, draggable: true, resizable: true})
            
         };
        //  var size = $scope.horarios.length;
        //     for (var i = 0; i < size ; i++) {
        //         if($scope.horarios[i].recurso == $scope.recurso._id) {
        //             console.log("eh igual");
        //             $scope.events.push({title: $scope.horarios[i].descricao , type: 'important', 
        //                 startsAt: $scope.horarios[i].data, endsAt: $scope.horarios[i].data, draggable: true, resizable: true})
        //         }
        // }

        

    })();
});
