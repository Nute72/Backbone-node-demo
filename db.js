/*!
 * MySQL connection class for node.js apps
 *
 * Author: Dave Clayton <davedx@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */
var mysql = require('mysql');
var db = '`inout`';

/**
 * Create client
 */
var client = mysql.createClient({
  user: 'node',
  password: 'node',
});

console.log('Connected to db.')

/**
 * Select database
 */
client.query('USE '+db);

/**
 * Perform an SQL query on the db.
 *
 * @return {Function}
 * @api public
 */
exports.query = function(sql, params, cb) {
	client.query(sql, params, cb);
}

