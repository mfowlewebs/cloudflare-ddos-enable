"use strict"

var mw = require("most2whatstream");
var most = require("most")
var arpm = require("arpm");

var rate = process.env.ARPM ? parseFloat(process.env.ARPM) : 200
// rate limiter itself
var limitGenerator = arpm(rate, {drain: true})
// a stream of "use tokens"
var limit = most.generate(limitGenerator);
// get a ReadableStream & reader because it has a
// different Promised based API more compatible with
// consumption patterns here.
var readable = mw.ReadableMost(limit);
var reader = readable.getReader();

/**
 * Get a ticket to do CloudFlare API work
 */
module.exports = function(){
	// Read a ticket off the reader.
	return reader.read();
}

/**
 * Close down the limit generator
 *
 * Sadly we cannot use arpm#drain, as most.generate will forever continue
 * drawing from arpm, even when no requests are needed.
 */
module.exports.done = function(){
	limitGenerator.pause()
}
