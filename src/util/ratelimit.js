"use strict"

var mw = require("most2whatstream");
var most = require("most")
var arpm = require("arpm");

// temporary limit of 30 requests/minute
var limiter = most.generate(arpm(30));
var readable = mw.ReadableMost(limiter);
var reader = readable.getReader();

/**
 * Get a ticket to do CloudFlare API work
 */
module.exports = function(){
	return reader.read();
}
