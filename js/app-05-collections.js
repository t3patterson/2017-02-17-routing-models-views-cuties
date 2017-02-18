
function congressCutieTemplate(listOfCongressFolkModels, viewType, dataObj){
	let viewTypeTitleMap = {
		root: 'All the Congress People',
		byState: `Showing Cuties from ${dataObj.state}`,
		byGenderAndParty: `Showing ${dataObj.party} Cuties that are ${dataObj.gender}`	
	}

	let congressPeopleHtml = listOfCongressFolkModels.map( function(legislatorModel, viewType, dataObj){
		return `
			<div class="profile-card">
				<img src="http://flathash.com/${legislatorModel.get('bioguide_id')}">
				<h5>
					${legislatorModel.get('first_name')}</br>
					<small>${legislatorModel.get('state_name')}</small>
				</h5>
			</div>`
	}).join('')
	
	return `
		<h1>${viewTypeTitleMap[viewType]}</h1>
		<hr/>
		${congressPeopleHtml}
	`
}
// EXTEND THE Backbone.Router to AppRouter constructor function

const AppRouter = Backbone.Router.extend({
	initialize: function(){
		console.log('app routing');
		Backbone.history.start()
	},
	
	routes : {
		'party/:prt/gender/:gndr' : 'showCongressPersonByPartyAndGender',
		'state/:st' : 'showCongressPersonByState', 
		'' : 'showCongressPersons'
	},
	
	showCongressPersons: function(){
		
		let cutieCollection = new CongressCutieCollection()
		cutieCollection.fetch().then(function(serverRes){
		// console.log(cutieCollection.models.length > 0)
		// console.log('original serveres', serverRes)
		// console.log('bb collection instance',  cutieCollection)
		// let firstModelInst =  cutieCollection.models[0]
		// 
		// console.log('the first model', firstModelInst)
		// console.log('the first_name attr on the model', firstModelInst.get('first_name'))
		// console.log('accessing an fec_ids array element on the model ', firstModelInst.get('fec_ids')[0])

			let congressPersonsModelsList = cutieCollection.models
			let bigHTMLStr = congressCutieTemplate(congressPersonsModelsList, 'root', {})
			document.querySelector('#app-container').innerHTML = bigHTMLStr
		})

	},
	
	
	showCongressPersonByState: function(stateInRoute){
		let cutieColl = new CongressCutieCollection(`state=${stateInRoute}`) 
		cutieColl.fetch().then(function(serverRes){

			let congressPersonsModelsList = cutieColl.models
			let bigHTMLStr = congressCutieTemplate(congressPersonsModelsList, 'root', {})
			document.querySelector('#app-container').innerHTML = bigHTMLStr
		})
		// cutieCollection.url === 'https://congress.api.sunlightfoundation.com/legislators?callback=?&state=xxxx'

		// $.getJSON(`https://congress.api.sunlightfoundation.com/legislators?callback=?&state=${stateInRoute}`)
		// 	.then(function(serverRes){
		// 		let congressPersonsResultsList = serverRes.results
		// 		let bigHTMLStr = congressCutieTemplate(congressPersonsResultsList, 'byState', {state: stateInRoute})
		// 		document.querySelector('#app-container').innerHTML = bigHTMLStr
		// })
	},

	showCongressPersonByPartyAndGender: function(prty, gendr){
		$.getJSON(`https://congress.api.sunlightfoundation.com/legislators?callback=?&party=${prty}&gender=${gendr}`)
			.then(function(serverRes){
				let congressPersonsResultsList = serverRes.results
				let bigHTMLStr = congressCutieTemplate(congressPersonsResultsList, 'byGenderAndParty', {party: prty , gender: gendr})
				document.querySelector('#app-container').innerHTML = bigHTMLStr
			})

	}
})


// Create new instance of AppRouter

const myApp = new AppRouter()