#!/usr/bin/env node

var fetch = require("./src/util/fetch")
var record = require("./src/service/record")
var zone = require("./src/service/zone")

var listZones = require("./bin/list-zones")
var listPlans = require("./bin/list-plans")
var listRecords = require("./bin/list-records")
var updatePlans = require("./bin/update-plans")
var updateProxied = require("./bin/update-proxied")

module.exports.fetch = fetch
module.exports.record = record
module.exports.zone = zone

module.exports.bin = {
	listZones,
	listPlans,
	listRecords,
	updatePlans,
	updateProxied
}
