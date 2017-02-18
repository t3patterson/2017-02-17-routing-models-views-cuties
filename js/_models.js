
const CongressCutieModel = Backbone.Model.extend({

	initialize: function(congressBioId){
		this.url = `https://congress.api.sunlightfoundation.com/legislators?callback=?&bioguide_id=${congressBioId}`
	},

	parse: function(rawServerRes){

		//fetch for single model, not yet parsed
		if(typeof rawServerRes.results !== 'undefined' ){
			return rawServerRes.results[0]
		} else {
			//fetched from collection, already parsed
			return rawServerRes
		}
		
	},


	url: 'https://congress.api.sunlightfoundation.com/legislators?callback=?&bioguide_id='

	
})

const CongressCutieCollection = Backbone.Collection.extend({
	initialize: function(qryStrParams){
		if(typeof qryStrParams !== 'undefined'){
			this.url = `${this.url}&${qryStrParams}`
		}
	},
	
	parse: function(rawServerRes){
		console.log('parsing Response!!')
		return rawServerRes.results
	},
	
	url: 'https://congress.api.sunlightfoundation.com/legislators?callback=?',
	
	model: CongressCutieModel
})