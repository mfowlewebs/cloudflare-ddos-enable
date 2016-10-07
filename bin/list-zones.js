#!/usr/bin/env node

var zone = require("../src/service/zone")
var lines = require("../src/util/lines")

/**
 * Get zones for an account, dump to stdout
 * @param optionalFilters list of names to match (multipler terms OR'ed).
 */
function listZones(stdin){
	return lines(stdin).then(function(filters){
		return zone.list(filters)
	})
}

if(require.main === module){
	listZones().then(function(zones){
		zones.forEach(z => console.log(JSON.stringify(z)))
	})
}

module.exports = listZones
module.exports.main = listZones
