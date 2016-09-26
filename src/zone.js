var fetch = require("./util/fetch");

function list(names){
	var params = "";
	if(names){
		if(!Array.isArray(names)){
			names = [names]
		}
		params = names.reduce(function(state, name, i){
			if(name){
				state.push("&name=", name);
			}
			return state;
		}, ["?match=any"]).join("");
	}
	console.log(params)
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones" + params);
}

function detail(id){
	return fetch.fetchAllPages("https://api.cloudflare.com/client/v4/zones/" + id);
}

function details(...names){
	return list.apply(null, names).then(function(){
		
	});
}

module.exports.list = list;
module.exports.details = details;
