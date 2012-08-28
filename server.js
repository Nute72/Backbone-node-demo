/*!
 * Server class
 *
 * Author: Dave Clayton <davedx@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */
var mysql = require('mysql');
var express = require('express');
var db = require('./db.js');
var user = require('./user.js');

// use body parser so we get JSON in our request.body
var app = express();
app.configure(function() {
	app.use(express.bodyParser());
});

/**
 * Setup routes for REST API
 */
app.get('/api/users', user.list);
app.get('/api/users/:id', user.get);
app.post('/api/users', user.new);

/**
 * Serve any static content in /public if it doesn't
 * match the API routes
 */
app.use(express.static('public'));

/**
 * Bind node to port 3000
 */
app.listen(3000)


