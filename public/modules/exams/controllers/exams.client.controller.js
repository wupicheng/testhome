'use strict';

angular.module('exams').controller('ExamsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exams',
	function($scope, $stateParams, $location, Authentication, Exams) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var exam = new Exams({
				exam_name: this.exam_name,
                exam_password: this.exam_password
			});

			exam.$save(function(response) {
				$location.path('exams/' + response._id);

				$scope.exam_name = '';
				$scope.exam_password = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(exam) {
			if (exam) {
				exam.$remove();

				for (var i in $scope.exams) {
					if ($scope.exams[i] === exam) {
						$scope.exams.splice(i, 1);
					}
				}
			} else {
				$scope.exam.$remove(function() {
					$location.path('exams');
				});
			}
		};

		$scope.update = function() {
			var exam = $scope.exam;

			exam.$update(function() {
				$location.path('exams/' + exam._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.exams = Exams.query();
		};

		$scope.findOne = function() {
			$scope.exam = Exams.get({
				examId: $stateParams.examId
			});
		};
	}
]);