function toId(input){
	// return id if present
	if(input && input.id){
		return input.id
	}

	// try parsing as json & checking for id
	if(typeof input === "string"){
		try{
			var o = JSON.parse(input)
			// return id if it has it
			if(o.id){
				return o.id
			}
		}catch(ex){
		}
	}
	return input
}

module.exports = toId
