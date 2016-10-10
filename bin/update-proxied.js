#!/usr/bin/env node
"use strict"

process.on("unhandledRejection", console.log)

var lines = require("../src/util/lines")
var most = require("most")
var ratelimit = require("../src/util/ratelimit")
var record = require("../src/service/record")
var toId = require("../src/util/to-id")

/**
 * For each record, set it's proxiable.
 * @param {record} record - a complete JSON or object record to update
 * @param {boolean} [state=true] - what to set proxied to
 */
function updateProxied(records, state){
	state = !!(state === undefined ? true : state)
	return most
		.from(records)
		.map(function(r){
			if(typeof r === "string" || r instanceof String){
				r = JSON.parse(r)
			}
			var proxied = record.setProxied(r, state)
			return proxied
		})
}

/**
 * Read complete JSON records from stdin, and update their proxied status.
 * @returns a most stream 
 */
function main(stdin){
	stdin = stdin || process.stdin
	return lines(stdin).then(function(details){
		return updateProxied(details, true).await()
	})
}

if(require.main === module){
	main().then(function(records){
		records
			.forEach(record => console.log(JSON.stringify(record)))
			.then(ratelimit.done)
	})
}

module.exports = updateProxied
module.exports.main = main
