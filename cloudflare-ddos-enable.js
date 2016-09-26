#!/usr/bin/env node

var fetch = require("./src/util/fetch");
var record = require("./src/record");
var zone = require("./src/zone");

module.exports.fetch = fetch;
module.exports.record = record;
module.exports.zone = zone;

function main(){
	//if(process.argv.length <= 2){
	//	throw new Error("No domain names specified")
	//}
	zone.list(process.argv.slice(2)).then(fetch.print);
}

function unhandledRejection(){
	process.on("unhandledRejection", function(rej){
		console.error(rej)
		process.exit(2);
	})
}

if(require.main === module){
	unhandledRejection();
	main();
}

module.exports.main= main;
module.exports.unhandledRejection= unhandledRejection;
