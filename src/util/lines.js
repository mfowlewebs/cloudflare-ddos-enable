"use strict"

var byline = require("byline")

function lines(stdin){
	stdin = stdin || process.stdin
	var defer = Promise.defer()
	var results = []
	byline(stdin, {encoding: "utf8"}).on("data", d => results.push(d))
	stdin.on("end", _ => defer.resolve(results))
	return defer.promise
}

module.exports = lines
