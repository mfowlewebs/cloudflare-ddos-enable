var creds = require("../../creds.json");
var Fetch = require("node-fetch");

module.exports= function fetch(url, opts){
	opts = opts || {}
	opts.headers = Object.assign({}, module.exports.headers);
	return Fetch(url, opts);
};
module.exports.fetch= module.exports;

module.exports.headers= {
	"X-Auth-Email": creds.email,
	"X-Auth-Key": creds.key,
	"Content-Type": "application/json",
};

module.exports.print= function(response){
	var status = response;
	var json = response
	if(json.json){
		json = json.json()
	}
	return json.then(function(json){
		console.log(JSON.stringify(json));
		return {status, json};
	});
};