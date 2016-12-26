var util = require('util');
var validator = require('validator');

module.exports = {
	appendSuffix: function(number){
		if (validator.isInt(number) != true)
		{
			throw new 'Oh no';
		}

		var digits = Math.abs(number).toString().split('').reverse();

		if(digits.length > 1 && digits[1] == 1){
			return util.format('%sth', number);
		}else{
			if(digits[0] == 1){
				return util.format('%sst', number);
			}else if(digits[0] == 2){
				return util.format('%snd', number);
			}else if(digits[0] == 3){
				return util.format('%srd', number);
			}else{
				return util.format('%sth', number);
			}
		}
	}
};
