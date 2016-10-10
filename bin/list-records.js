#!/usr/bin/env node
"use strict"

var lines = require("../src/util/lines")
var most = require("most")
var mostPromiseSpread = require("most-promise-spread")
var ratelimit = require("../src/util/ratelimit")
var record = require("../src/service/record")
var toId = require("../src/util/to-id")
var zone = require("../src/service/zone")

process.on("unhandledRejection", r => console.log(r))

/**
 * Get all records in a zone
 * @param optionalFilters list of names to match (multipler terms OR'ed).
 */
function listRecords(zoneIds){
	return most
		.from(zoneIds)
		.concatMap(function(zoneId){
			zoneId = toId(zoneId)
			var records = record.list(zoneId)
			return mostPromiseSpread(records)
		})
}

/**
 * Accept zone records or zone ids and print a list of all such records
 */
function main(stdin){
	return lines().then(function(zoneIds){
		return listRecords(zoneIds)
	})
}

if(require.main === module){
	main().then(function(records){
		records
			.forEach(record => console.log(JSON.stringify(record)))
			.then(ratelimit.done)
	})
}

module.exports = listRecords
module.exports.main = main
