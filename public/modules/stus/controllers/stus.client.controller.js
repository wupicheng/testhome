'use strict';

angular.module('stus').controller('StusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stus',
	function($scope, $stateParams, $location, Authentication, Stus) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var stu = new Stus({
				stu_name: this.stu_name,
                stu_password: this.stu_password
			});

			stu.$save(function(response) {
				$location.path('stus/' + response._id);

				$scope.stu_name = '';
				$scope.stu_password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(stu) {
			if (stu) {
				stu.$remove();

				for (var i in $scope.stus) {
					if ($scope.stus[i] === stu) {
						$scope.stus.splice(i, 1);
					}
				}
			} else {
				$scope.stu.$remove(function() {
					$location.path('stus');
				});
			}
		};

		$scope.update = function() {
			var stu = $scope.stu;

			stu.$update(function() {
				$location.path('stus/' + stu._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.stus = Stus.query();
		};

		$scope.findOne = function() {
			$scope.stu = Stus.get({
				stuId: $stateParams.stuId
			});
		};
	}
]);