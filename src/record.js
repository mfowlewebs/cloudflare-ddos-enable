var fetch = require("./util/fetch");

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
