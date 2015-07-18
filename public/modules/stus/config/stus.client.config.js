'use strict';

// Configuring the Articles module
angular.module('stus').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Stus', 'stus', 'dropdown', '/stus(/create)?');
		Menus.addSubMenuItem('topbar', 'stus', 'List Stus', 'stus');
		Menus.addSubMenuItem('topbar', 'stus', 'New Stus', 'stus/create');
	}
]);