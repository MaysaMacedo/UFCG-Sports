/**
 * Utils
 */

'use strict';

var _ = require('lodash');

exports.applyFilters = function (query, filters, values) {
	_.each(values, function(value, key) {
		switch(filters[key]) {
		case 'contains':
			query.where(key).equals({'$regex': new RegExp(value.toLowerCase(), "i")})
			break
		case 'lessThenEquals':
			query.where(key).lte(value)
			break
		case 'greaterThenEquals':
			query.where(key).gte(value)
			break
		default:
			break
		} 
	})
	return query
}
