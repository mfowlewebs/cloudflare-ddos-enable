#!/usr/bin/env node
"use strict"

var lines = require("../src/util/lines")
var most = require("most")
var toId = require("../src/util/to-id")
var record = require("../src/service/record")

/**
 * For each record, set it's proxiable.
 * @param zoneIds - a list of zone ids
 * @param planId - the plan id to set each zone to
 */
function updateProxied(details, state){
	state = !!(state === undefined ? true : state)
	return most
		.from(details)
		.map(function(details){
			if(typeof record === "string" || k instanceof String){
				record = JSON.parse(record)
			}
			var proxied = record.setProxied(record)
			return proxied
		})
}

/**
 * Read complete JSON records from stdin, and update their proxied status.
 * @returns a most stream 
 */
function main(stdin, planId){
	stdin = stdin || process.stdin
	planId = planId || process.argv[2]
	if(!planId){
		throw new Error("Expected planId as argument")
	}
	return lines(stdin).then(function(details){
		return updateProxied(details, true).await()
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
