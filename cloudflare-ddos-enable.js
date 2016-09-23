#!/usr/bin/env node
var creds = require("./creds.json");
var fetch = require("node-fetch");

function enableDdos(zoneId){
	return fetch("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/settings", {
		method: "PATCH",
		body: JSON.stringify({
			"items": [
				{"id":"advanced_ddos","value":"on"}
		]}),
		headers:{
			"X-Auth-Email": creds.email,
			"X-Auth-Key": creds.key,
			"Content-Type": "application/json"
		}})
}

function print(response){
	console.log("status", response.status)
	return response.text().then(function(text){
		console.log(text)
	})
}

function findZone(name){
	
}

function main(){
	if(!process.argv[2]){
		throw new Error("No zoneId specified")
	}
	enableDdos(process.argv[2]).then(print)
}

if(require.main === module){
	main()
}
