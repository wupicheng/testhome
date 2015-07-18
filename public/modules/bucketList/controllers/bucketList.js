'use strict';

angular.module('mean.bucketList').controller('BucketListController', ['$scope', '$stateParams', '$location', 'Global',
    function($scope, $stateParams, $location, Global) {
        $scope.global = Global;
    }

]);
