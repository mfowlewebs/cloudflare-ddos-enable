"use strict"

var Byline = require("byline")

function lines(stdin){
	stdin = stdin || process.stdin
	var
	  defer = Promise.defer(),
	  results = [],
	  byline = Byline(stdin, {encoding: "utf8"}).on("data", d => results.push(d))
	stdin.on("end", function(){
		byline.end()
		defer.resolve(results)
	})
	return defer.promise
}

module.exports = lines
