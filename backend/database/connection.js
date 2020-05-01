// Package imports:
const knex = require('knex');

// File imports:
const configuration = require('../knexfile');

// Create connection:
const connection = knex(configuration.development);

// Export module:
module.exports = connection;
