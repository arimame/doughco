module.exports = {
	generateAlphanumericString: function(length = 6) {
		let alpha = "";
  	for (let i = 0; i < length; i++) {
  		let n = Math.floor(Math.random() * 36).toString(36);
  		// 50/50 chance of n.toUpperCase()
    	alpha += Math.floor(Math.random() * 2) === 0 ? n : n.toUpperCase();
  	}
  	return alpha;	
	}
}