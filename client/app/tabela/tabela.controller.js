'use strict';

angular.module('finalnodeApp')
  .controller('TabelaIndexCtrl', function ($scope, $http, $q) {
    $scope.horarios = [];
    $scope.recursos = [];
    $scope.horasPossiveis = [5, 6.5, 8, 9.5, 11, 12.5, 14, 15.5, 17, 18.5, 20, 21.5, 23];
    $scope.horarioUsuario = {};
    $scope.dia = new Date();
    $scope.recurso = undefined;
    $scope.userIDToName = {};

    function carregarInformacoes() {
      var horarioPromise = $http.get('/api/horarios').then(function(response) {
        $scope.horarios = response.data;
      });

      var recursoPromise = $http.get('/api/recursos').then(function(response) {
        var recursos = response.data;
        for(var chave in recursos) {
          var recurso = recursos[chave];
          if(recurso.active) {
            $scope.recursos.push(recurso);
          }
        }
        if($scope.recursos.length > 0) {
          $scope.recurso = $scope.recursos[0];
        }
      });

      $q.all([horarioPromise, recursoPromise]).then(function() {
        $scope.repopulaTabela();
      });
    }

    function zeraTempoDia(data) {
      data.setHours(0,0,0,0);
      return data;
    }

    $scope.mudarDia = function(quantidade) {
      $scope.dia.setDate($scope.dia.getDate() + quantidade);
      $scope.repopulaTabela();
    }

    function horarioAExibir(horario) {
      var segundoEmMilisegundos = 1000;
      var minutoEmSegundos = 60;
      var horaEmMinutos = 60;
      var diaEmHoras = 24;
      var semanaEmDias = 7;
      var semanaEmMilisegundos = semanaEmDias*diaEmHoras*horaEmMinutos*minutoEmSegundos*segundoEmMilisegundos;
      var recursoCorreto = horario.recurso == $scope.recurso._id;
      var diferencaDeTempo = zeraTempoDia($scope.dia).getTime() - zeraTempoDia(new Date(horario.data)).getTime();
      var diaCorreto = diferencaDeTempo == 0 || 
                      (horario.semanal && diferencaDeTempo > 0 && (diferencaDeTempo % semanaEmMilisegundos) == 0);
      return recursoCorreto && diaCorreto;
    }

    function obterNomeDoUsuarioProHorario(horario) {
      if($scope.userIDToName[horario.usuario] == undefined) {
        $http.get('/api/users/' + horario.usuario).success(function(user) {
          $scope.userIDToName[user.id] = user.name;
        });
      }
    }

    $scope.repopulaTabela = function() {
      $scope.horarioUsuario = {};
      for(var chave in $scope.horarios) {
        var horario = $scope.horarios[chave];
        if(horarioAExibir(horario)) {
          $scope.horarioUsuario[horario.hora] = horario.usuario;
          obterNomeDoUsuarioProHorario(horario);
        }
      }
    }

    $scope.formataHora = function(horario) {
      var minutosEmUmaHora = 60;
      var horas = Math.floor(horario).toString();
      var minutos = ((horario - horas)*minutosEmUmaHora).toString();
      if(minutos.length == 1) {
        minutos += "0";
      }
      return horas + ":" + minutos;
    }

    $scope.nomeUsuario = function(usuarioID) {
      return $scope.userIDToName[usuarioID];
    }

    carregarInformacoes();
  });
