#!/usr/bin/env node

var fetch = require("./src/util/fetch");
var record = require("./src/record");
var zone = require("./src/zone");

module.exports.fetch = fetch;
module.exports.record = record;
module.exports.zone = zone;

/**
 * Print all zone id's to console.
 */
function getAllZoneIds(optionalFilters){
	return zone.list(optionalFilters).then(function(zones){
		zones.map(z => console.log(z.id));
		return zones;
	});
}

/**
 * Enable proxy for all records in a zone
 */
function proxyZone(zoneIds){
	var results = zoneIds.map(record.setProxiedForZone);
	return Promise.all(results);
}

function main(){
	if(process.argv.length <= 2){
		return getAllZoneIds();
	}else{
		var zoneIds = process.argv.slice(2);
		proxyZone(zoneIds);
	}
}

function unhandledRejection(){
	process.on("unhandledRejection", function(rej){
		console.error(rej)
		process.exit(2);
	});
	process.on("uncaughtException", function(ex){
		console.log(ex);
		process.exit(2);
	});
}

if(require.main === module){
	unhandledRejection();
	main();
}

module.exports.main = main;
module.exports.getAllZoneIds = getAllZoneIds;
module.exports.proxyZone = proxyZone;
module.exports.unhandledRejection= unhandledRejection;
