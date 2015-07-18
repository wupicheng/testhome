'use strict';

(function() {
	// Teachers Controller Spec
	describe('TeachersController', function() {
		// Initialize global variables
		var TeachersController,
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

			// Initialize the Teachers controller.
			TeachersController = $controller('TeachersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one teacher object fetched from XHR', inject(function(Teachers) {
			// Create sample teacher using the Teachers service
			var sampleTeacher = new Teachers({
				teacher_name: 'An Teacher about MEAN',
                teacher_password: 'MEAN rocks!'
			});

			// Create a sample exams array that includes the new teacher
			var sampleTeachers = [sampleTeacher];

			// Set GET response
			$httpBackend.expectGET('exams').respond(sampleTeachers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.exams).toEqualData(sampleTeachers);
		}));

		it('$scope.findOne() should create an array with one teacher object fetched from XHR using a teacherId URL parameter', inject(function(Teachers) {
			// Define a sample teacher object
			var sampleTeacher = new Teachers({
                teacher_name: 'An Teacher about MEAN',
                teacher_password: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.teacherId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/exams\/([0-9a-fA-F]{24})$/).respond(sampleTeacher);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.teacher).toEqualData(sampleTeacher);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Teachers) {
			// Create a sample teacher object
			var sampleTeacherPostData = new Teachers({
                teacher_name: 'An Teacher about MEAN',
                teacher_password: 'MEAN rocks!'
			});

			// Create a sample teacher response
			var sampleTeacherResponse = new Teachers({
				_id: '525cf20451979dea2c000001',
                teacher_name: 'An Teacher about MEAN',
                teacher_password: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.teacher_name = 'An Teacher about MEAN';
			scope.teacher_password = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('exams', sampleTeacherPostData).respond(sampleTeacherResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the teacher was created
			expect($location.path()).toBe('/exams/' + sampleTeacherResponse._id);
		}));

		it('$scope.update() should update a valid teacher', inject(function(Teachers) {
			// Define a sample teacher put data
			var sampleTeacherPutData = new Teachers({
				_id: '525cf20451979dea2c000001',
                teacher_name: 'An Teacher about MEAN',
                teacher_password: 'MEAN rocks!'
			});

			// Mock teacher in scope
			scope.teacher = sampleTeacherPutData;

			// Set PUT response
			$httpBackend.expectPUT(/exams\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/exams/' + sampleTeacherPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid teacherId and remove the teacher from the scope', inject(function(Teachers) {
			// Create new teacher object
			var sampleTeacher = new Teachers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new exams array and include the teacher
			scope.exams = [sampleTeacher];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/exams\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTeacher);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.exams.length).toBe(0);
		}));
	});
}());