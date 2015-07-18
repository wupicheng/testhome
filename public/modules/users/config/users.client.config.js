'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);

//用户管理菜单设置
angular.module('users').run(['Menus',
    function(Menus) {
        // Set top bar menu items
        //this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
        //Menus.addMenuItem('topbar', 'Exams', 'exams', 'dropdown', '/exams(/create)?',false,'user');
        Menus.addMenuItem('topbar', '账户管理', 'users', 'dropdown', '/users(/create)?',false,['admin']);
        //Menus.addSubMenuItem('topbar', 'exams', '未完成考试', 'exams');
        Menus.addSubMenuItem('topbar', 'users', '所有账户', 'users/listAllUsers');
        Menus.addSubMenuItem('topbar', 'users', '新建账户', 'users/examisdone');
        //Menus.addSubMenuItem('topbar', 'exams', '已结束考试', 'exams/create');
    }
]);