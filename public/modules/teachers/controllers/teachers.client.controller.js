'use strict';

angular.module('teachers').controller('TeachersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Teachers',
	function($scope, $stateParams, $location, Authentication, Teachers) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var teacher = new Teachers({
				teacher_name: this.teacher_name,
                teacher_password: this.teacher_password
			});

			teacher.$save(function(response) {
				$location.path('teachers/' + response._id);

				$scope.teacher_name = '';
				$scope.teacher_password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(teacher) {
			if (teacher) {
				teacher.$remove();

				for (var i in $scope.teachers) {
					if ($scope.teachers[i] === teacher) {
						$scope.teachers.splice(i, 1);
					}
				}
			} else {
				$scope.teacher.$remove(function() {
					$location.path('teachers');
				});
			}
		};

		$scope.update = function() {
			var teacher = $scope.teacher;

			teacher.$update(function() {
				$location.path('teachers/' + teacher._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.teachers = Teachers.query();
		};

		$scope.findOne = function() {
			$scope.teacher = Teachers.get({
				teacherId: $stateParams.teacherId
			});
		};
	}
]);