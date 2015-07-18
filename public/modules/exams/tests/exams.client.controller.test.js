'use strict';

(function() {
	// Exams Controller Spec
	describe('ExamsController', function() {
		// Initialize global variables
		var ExamsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Exams controller.
			ExamsController = $controller('ExamsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one exam object fetched from XHR', inject(function(Exams) {
			// Create sample exam using the Exams service
			var sampleExam = new Exams({
				exam_name: 'An Exam about MEAN',
                exam_password: 'MEAN rocks!'
			});

			// Create a sample exams array that includes the new exam
			var sampleExams = [sampleExam];

			// Set GET response
			$httpBackend.expectGET('exams').respond(sampleExams);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exams).toEqualData(sampleExams);
		}));

		it('$scope.findOne() should create an array with one exam object fetched from XHR using a examId URL parameter', inject(function(Exams) {
			// Define a sample exam object
			var sampleExam = new Exams({
                exam_name: 'An Exam about MEAN',
                exam_password: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.examId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/exams\/([0-9a-fA-F]{24})$/).respond(sampleExam);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exam).toEqualData(sampleExam);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Exams) {
			// Create a sample exam object
			var sampleExamPostData = new Exams({
                exam_name: 'An Exam about MEAN',
                exam_password: 'MEAN rocks!'
			});

			// Create a sample exam response
			var sampleExamResponse = new Exams({
				_id: '525cf20451979dea2c000001',
                exam_name: 'An Exam about MEAN',
                exam_password: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.exam_name = 'An Exam about MEAN';
			scope.exam_password = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('exams', sampleExamPostData).respond(sampleExamResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the exam was created
			expect($location.path()).toBe('/exams/' + sampleExamResponse._id);
		}));

		it('$scope.update() should update a valid exam', inject(function(Exams) {
			// Define a sample exam put data
			var sampleExamPutData = new Exams({
				_id: '525cf20451979dea2c000001',
                exam_name: 'An Exam about MEAN',
                exam_password: 'MEAN rocks!'
			});

			// Mock exam in scope
			scope.exam = sampleExamPutData;

			// Set PUT response
			$httpBackend.expectPUT(/exams\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/exams/' + sampleExamPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid examId and remove the exam from the scope', inject(function(Exams) {
			// Create new exam object
			var sampleExam = new Exams({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new exams array and include the exam
			scope.exams = [sampleExam];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/exams\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleExam);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.exams.length).toBe(0);
		}));
	});
}());