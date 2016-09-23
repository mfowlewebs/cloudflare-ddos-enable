var fetch = require("./util/fetch");

function list(...names){
	names = names || []
	var params = names.reduce(function(state, name, i){
		state.push("&name=", name);
		return state;
	}, ["?match=any"]).join("");
	return fetch("https://api.cloudflare.com/client/v4/zones" + params);
}

function details(id){
	return fetch("https://api.cloudflare.com/client/v4/zones/" + id);
	
}

module.exports.list = list;
module.exports.details = details;
