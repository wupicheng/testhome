'use strict';

(function() {
	// Stus Controller Spec
	describe('StusController', function() {
		// Initialize global variables
		var StusController,
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

			// Initialize the Stus controller.
			StusController = $controller('StusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one stu object fetched from XHR', inject(function(Stus) {
			// Create sample stu using the Stus service
			var sampleStu = new Stus({
				stu_name: 'An Stu about MEAN',
                stu_password: 'MEAN rocks!'
			});

			// Create a sample stus array that includes the new stu
			var sampleStus = [sampleStu];

			// Set GET response
			$httpBackend.expectGET('stus').respond(sampleStus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stus).toEqualData(sampleStus);
		}));

		it('$scope.findOne() should create an array with one stu object fetched from XHR using a stuId URL parameter', inject(function(Stus) {
			// Define a sample stu object
			var sampleStu = new Stus({
                stu_name: 'An Stu about MEAN',
                stu_password: 'MEAN rocks!'
			});

			// Set the URL parameter
			$stateParams.stuId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/stus\/([0-9a-fA-F]{24})$/).respond(sampleStu);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.stu).toEqualData(sampleStu);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Stus) {
			// Create a sample stu object
			var sampleStuPostData = new Stus({
                stu_name: 'An Stu about MEAN',
                stu_password: 'MEAN rocks!'
			});

			// Create a sample stu response
			var sampleStuResponse = new Stus({
				_id: '525cf20451979dea2c000001',
                stu_name: 'An Stu about MEAN',
                stu_password: 'MEAN rocks!'
			});

			// Fixture mock form input values
			scope.stu_name = 'An Stu about MEAN';
			scope.stu_password = 'MEAN rocks!';

			// Set POST response
			$httpBackend.expectPOST('stus', sampleStuPostData).respond(sampleStuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.title).toEqual('');
			expect(scope.content).toEqual('');

			// Test URL redirection after the stu was created
			expect($location.path()).toBe('/stus/' + sampleStuResponse._id);
		}));

		it('$scope.update() should update a valid stu', inject(function(Stus) {
			// Define a sample stu put data
			var sampleStuPutData = new Stus({
				_id: '525cf20451979dea2c000001',
                stu_name: 'An Stu about MEAN',
                stu_password: 'MEAN rocks!'
			});

			// Mock stu in scope
			scope.stu = sampleStuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/stus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/stus/' + sampleStuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid stuId and remove the stu from the scope', inject(function(Stus) {
			// Create new stu object
			var sampleStu = new Stus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new stus array and include the stu
			scope.stus = [sampleStu];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/stus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleStu);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.stus.length).toBe(0);
		}));
	});
}());