#!/usr/bin/env node

var fetch = require("./src/util/fetch");
var record = require("./src/record");
var zone = require("./src/zone");

module.exports.fetch = fetch
module.exports.record = record
module.exports.zone = zone

function main(){
	if(process.argv.length <= 2){
		throw new Error("No domain names specified")
	}
	zone.list.call(null, process.argv.slice(2)).then(fetch.print)
}

if(require.main === module){
	main()
}
