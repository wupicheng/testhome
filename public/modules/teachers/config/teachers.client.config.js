'use strict';

// Configuring the teachers module
angular.module('teachers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		//Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?',false,'user');
		Menus.addMenuItem('topbar', 'Teachers', 'teachers', 'dropdown', '/teachers(/create)?',false,['admin']);
		Menus.addSubMenuItem('topbar', 'teachers', 'List Teachers', 'teachers');
		Menus.addSubMenuItem('topbar', 'teachers', 'New Teachers', 'teachers/create');
	}
]);