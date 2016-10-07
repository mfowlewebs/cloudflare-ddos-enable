var fetch = require("../util/fetch");

function list(zoneId){
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/dns_records");
}

function details(zoneId, recordId){
	var suffix = recordId ? "/" + recordId : ""
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones/" + zoneId + "/dns_records" + suffix);
}

function setProxied(details){
	// set proxied
	details.proxied = true;
	// update dns record
	return fetch.fetch("https://api.cloudflare.com/client/v4/zones/" + details.zone_id + "/dns_records/" + details.id, {
		method: "PUT",
		body: JSON.stringify(details)
	});
}

function setProxiedForZone(zoneId){
	return module.exports.list(zoneId).then(function(records){
		var changes = records
			.filter(r => r.proxiable)
			.map(function(record){
				return module.exports.setProxied(record);
			});
		return Promise.all(changes);
	});


}

module.exports.list = list;
module.exports.details = details;
module.exports.setProxied = setProxied;
module.exports.setProxiedForZone = setProxiedForZone;
