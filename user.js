/*!
 * User class
 *
 * Author: Dave Clayton <davedx@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */
var db = require('./db.js')

/**
 * Create a new user.
 * Gets the JSON for the new user sent by the client and
 * inserts it into the database. If successful, returns
 * the data back with the primary key (_id) inserted.
 *
 * @param req {Object} the HTTP request
 * @param res {Object} the HTTP response
 * @return {Function}
 * @api public
 */
exports.new = function(req, res)
{
	var data = req.body;
	db.query(
		'INSERT INTO users '+
		'SET username = ?, password = ?',
		[data.username, data.password],
		function(err, results, fields) {
			var insertId = results.insertId
			data._id = insertId;
			res.send(JSON.stringify(data));
		}
	);
}

/**
 * List users.
 * Returns all public data about the users in the database
 * (_id, username) as JSON, or 404 if no users found.
 *
 * @param req {Object} the HTTP request
 * @param res {Object} the HTTP response
 * @return {Function}
 * @api public
 */
exports.list = function(req, res)
{
	db.query('SELECT _id, username FROM users',
		function(err, results, fields) {
			if(results !== undefined)
				res.send(JSON.stringify(results));
			else
				res.send(404);
	});
}

/**
 * Get a specific user.
 * Returns the JSON for the user as specified by
 * the ID in the request, or 404 if the user is not found.
 *
 * @param req {Object} the HTTP request
 * @param res {Object} the HTTP response
 * @return {Function}
 * @api public
 */
exports.get = function(req, res)
{
	var id = req.params.id;

	db.query('SELECT _id, username FROM users WHERE _id = ?',
		[id], function(err, results, fields) {
			if(results !== undefined)
				res.send(JSON.stringify(results[0]));
			else
				res.send(404);
	});
}

