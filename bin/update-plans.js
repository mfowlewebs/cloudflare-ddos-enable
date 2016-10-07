#!/usr/bin/env node
"use strict"

var lines = require("../src/util/lines")
var most = require("most")
var toId = require("../src/util/to-id")
var zone = require("../src/service/zone")

/**
 * For each zone, set it's planId
 * @param zoneIds - a list of zone ids
 * @param planId - the plan id to set each zone to
 */
function updatePlans(zoneIds, planId){
	return most
		.from(zoneIds)
		.map(function(zoneId){
			// accept raw zone id strings, zone objects, or zone json
			zoneId = toId(zoneId)
			var setPlan = zone.setPlan(zoneId, planId)
			return setPlan
		}).await()
}

/**
 * Read zones, zones json, or zoneIds from stdin, and set their plan
 */
function main(stdin, planId){
	stdin = stdin || process.stdin
	planId = planId || process.argv[2]
	if(!planId){
		throw new Error("Expected planId as argument")
	}
	return lines(stdin).then(function(zoneIds){
		return updatePlans(zoneIds, planId)
	})
}

if(require.main === module){
	main().then(function(records){
		records.forEach(function(record){
			console.log(JSON.stringify(record))
		})
	})
}

module.exports = updatePlans
module.exports.main = main
