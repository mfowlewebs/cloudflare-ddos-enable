var fetch = require("./util/fetch");

function list(zoneId){
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/dns_records");
}

function setProxied(zoneId){
	return fetch.fetch("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/settings", {
		method: "PATCH",
		body: JSON.stringify({
			"items": [{
				"id": "proxied",
				"value":"on"
			}]
		})
	});
}

function setProxiedForZone(zoneId){
	return module.exports.list(zoneId).then(function(records){
		var changes = records
			.filter(r => r.proxiable)
			.map(function(record){
				return module.exports.setProxied(zoneId, record.id);
			});
		return Promise.all(changes);
	});


}

module.exports.list = list;
module.exports.setProxied = setProxied;
module.exports.setProxiedForZone = setProxiedForZone;
