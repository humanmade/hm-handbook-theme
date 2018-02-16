module.exports = function (grunt) {
	'use strict';

	var loader = require('load-project-config'),
		config = require('grunt-theme-fleet');
	loader(grunt, config).init();
};