var fetch = require("./util/fetch");

function list(names){
	var params = "";
	if(names){
		if(!Array.isArray(names)){
			names = [names]
		}
		params = names.reduce(function(state, name){
			if(name){
				state.push("&name=", name);
			}
			return state;
		}, ["?match=any"]).join("");
	}
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones" + params);
}

function details(zoneId){
	return fetch.fetch("https://api.cloudflare.com/client/v4/zones/" + zoneId).then(fetch.json);
}

function settings(zoneId){
	return fetch.fetch("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/settings").then(fetch.json);
}

module.exports.list = list;
module.exports.details = details;
module.exports.settings = settings;
