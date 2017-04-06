#!/usr/bin/env node
"use strict"

var lines = require("../src/util/lines")
var most = require("most")
var mostPromiseSpread = require("most-promise-spread")
var ratelimit = require("../src/util/ratelimit")
var record = require("../src/service/record")
var toId = require("../src/util/to-id")
var unhandled = require("../src/util/unhandled")
var zone = require("../src/service/zone")

/**
 * Get all plans available for every zone
 * @param optionalFilters list of names to match (multipler terms OR'ed).
 */
function listPlans(zoneIds){
	return most
		.from(zoneIds)
		.concatMap(function(zoneId){
			// accept raw zone id strings, zone objects, or zone json
			zoneId = toId(zoneId)
			// get plans for this zone
			var plans = zone.plans(zoneId).then(function(plans){
				// attach zone id to every plan in this zone
				for(var i in plans){
					plans[i].zoneId = zoneId
				}
				return plans
			})
			// concatMap into the big list of plans
			return mostPromiseSpread(plans)
		})
}

/**
 * Accept zone records or zone ids and print a list of all such records
 */
function main(stdin){
	return lines().then(function(zoneIds){
		return listPlans(zoneIds)
	})
}

if(require.main === module){
	main().then(function(records){
		records
			.forEach(record => console.log(JSON.stringify(record)))
			.then(ratelimit.done)
	})
}

module.exports = listPlans
module.exports.main = main
