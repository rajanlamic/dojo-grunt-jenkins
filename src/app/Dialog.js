/**
 * This file is a very simple example of a class declaration in Dojo. It defines the `app/Dialog` module as a new
 * class that extends a dijit Dialog and overrides the default title and content properties.
 */
define([ 'dojo/_base/declare', 'dijit/Dialog' , './module2'], function (declare, Dialog, module2) {
	return declare(Dialog, {
		title: 'Hello World ' + module2.get,
		content: 'Loaded successfully!'
	});
});
