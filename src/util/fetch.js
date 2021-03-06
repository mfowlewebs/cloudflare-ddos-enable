var arpm = require("arpm");
var creds = require("../../creds.json");
var fetch = require("node-fetch");
var ratelimit = require("./ratelimit")

module.exports.fetch = function(url, opts){
	opts = opts || {}
	opts.headers = Object.assign({}, module.exports.headers);
	return ratelimit().then(function(){
		return fetch(url, opts);
	}).then(function(response){
		if(response.status >= 300){
			return response.text().then(function(text){
				var error = new Error(text);
				error.status = response.status
				error.url = url
				throw error;
			})
		}
		return response
     })
}

module.exports.headers = {
	"X-Auth-Email": creds.email,
	"X-Auth-Key": creds.key,
	"Content-Type": "application/json"
}

module.exports.json = function(response){
	var status = response.status;
	return response.json().then(function(json){
		return {status, json};
	});
}

module.exports.print = function(payload){
	console.log(payload);
	return payload;
}

module.exports.PAGE_SIZE = 500;

module.exports.fetchAllPages = function(startUrl){
	var url = [
		startUrl,
		startUrl.indexOf("?") === -1 ? "?" : "&",
		"per_page=", module.exports.PAGE_SIZE,
		"&page=", 1
	];
	function pageFetch(n){
		url[url.length - 1] = n;
		var pageUrl = url.join("");
		return module.exports.fetch(pageUrl);
	}

	// upon loading the first page, start other pages loading, then return as normal once begun
	var requests = pageFetch(1).then(function(first){
		var json = first.json();
		// fetch safety quirk - can only ask for 'json' once.
		first.json = () => json;
		// load first response json
		return json.then(function(json){
			// create array for all requests
			var responses = [first];
			// load other pages
			if(json.result_info && json.result_info.total_pages){
				for(var i = 2; i <= json.result_info.total_pages; ++i){
					responses.push(pageFetch(i));
				}
			}
			// return as normal, now that responses is fully built
			return Promise.all(responses);
		});
	});
	// get the json payload of each request
	var jsons = requests.then(function(responses){
		var jsons = responses.map(function(response){
			if(response.status >= 300){
				var error = new Error("request failed");
				error.response = response;
				throw error;
			}
			return response.json();
		});
		return Promise.all(jsons);
	});
	// collect all results together
	var collated = jsons.then(function(jsons){
		return jsons.reduce(function(state, json){
			return state.concat(json.result);
		}, []);
	});
	return collated;
}
