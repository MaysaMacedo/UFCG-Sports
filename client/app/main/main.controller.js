'use strict';

angular.module('finalnodeApp')
  .controller('MainCtrl', function ($scope, $http, $location, $routeParams, Auth) {

    var URI_RECURSO = '/api/recursos/';
    var URI_HORARIO = '/api/horarios/';
    $scope.recursos = [];
    $scope.recurso = {};
    $scope.horarios = [];
    $scope.reservas = [];
    $scope.temReserva = false;


    $scope.idRecursosLabels = [];
    $scope.labelsDoughnut = [];
    $scope.dataDoughnut = [];


    function recursoReservadoHoje() {
    
      var hoje = new Date();
      for (var i = 0; i < $scope.horarios.length ; i++) {
        var horarioData = new Date($scope.horarios[i].data);
        
        if(horarioData.setHours(0,0,0,0) == hoje.setHours(0,0,0,0)) {   
            if(jaExisteRecursoNoGrafico($scope.horarios[i].recurso)) {
                $scope.dataDoughnut[indiceDoRecurso($scope.horarios[i].recurso)]+1;          
            } else {
                $scope.idRecursosLabels.push($scope.horarios[i].recurso);
                
                $http.get(URI_RECURSO + $scope.horarios[i].recurso).success(function(recurso) {
                    $scope.labelsDoughnut.push(recurso.nome);
               });
               $scope.dataDoughnut.push(qntdReservasRecurso($scope.horarios[i].recurso));
            }   
        }
      };
    };

    $scope.getUltimaReserva = function(){
      var menor = $scope.reservas[0];
      $scope.reservas.forEach(function(reserva){
        if (reserva.data < menor.data){
            menor = reserva;
        }
      });
      this.ultimaReserva = menor;
      this.dataUltimaReserva = this.getDataUltimaReserva();
    }


    $scope.getDataUltimaReserva = function(){
      return this.ultimaReserva.data.slice(0,10);
    }

    function indiceDoRecurso(recurso) {
      Array.prototype.index = function (v) {
          return this.indexOf(v);
      }
      return $scope.idRecursosLabels.index(recurso);
    }

    function jaExisteRecursoNoGrafico(recurso) {
      Array.prototype.contains = function (v) {
          return this.indexOf(v) > -1;
      }
      return $scope.idRecursosLabels.contains(recurso);
    }

    function qntdReservasRecurso(recurso) {
      var hoje = new Date();
      var qntdReservas = 0;
        $scope.horarios.forEach(function(horario) {
          var horarioData = new Date(horario.data);
          if(horarioData.setHours(0,0,0,0) == hoje.setHours(0,0,0,0)) {
           if(horario.recurso == recurso) {
            qntdReservas = qntdReservas + 1;
           }
           
          }
        
      });
        return qntdReservas;
    };


    (function main() {
        $http.get(URI_RECURSO).success(function(recursos) {
            $scope.recursos = recursos;
        });

        $http.get(URI_HORARIO).success(function(horarios) {
            $scope.horarios = horarios;
            recursoReservadoHoje();
        });

        $http.get('/api/reservas').success(function(reservas) {
            $scope.reservas = reservas;
            $scope.getUltimaReserva();
            if ($scope.reservas.length > 0){
                $scope.temReserva = true;
            }

        });

    })();

  });
