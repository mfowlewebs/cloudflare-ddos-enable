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
	var zones = zone.list(process.argv.slice(2));
	zones.then(function(zones){
		function pick(){
			return zones[Math.floor(Math.random() * zones.length)];
		}
		var picks = [pick(), pick(), pick(), pick()];
		//console.log(picks[0], picks[1]);
		picks.forEach(function(pick){
			zone.detail(pick.id).then(function(z){
				console.log(JSON.stringify(z));
			});
		});
	});
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
