'use strict';

// Configuring the exams module
angular.module('exams').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		//Menus.addMenuItem('topbar', 'Exams', 'exams', 'dropdown', '/exams(/create)?',false,'user');
		Menus.addMenuItem('topbar', '在线考试', 'exams', 'dropdown', '/exams(/create)?',false,['user']);
		//Menus.addSubMenuItem('topbar', 'exams', '未完成考试', 'exams');
		Menus.addSubMenuItem('topbar', 'exams', '未完成考试', 'exams/examsisgoing');
		Menus.addSubMenuItem('topbar', 'exams', '已结束考试', 'exams/examisdone');
		//Menus.addSubMenuItem('topbar', 'exams', '已结束考试', 'exams/create');
	}
]);