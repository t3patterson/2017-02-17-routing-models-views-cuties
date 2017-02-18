

// function congressCutieTemplate(listOfCongressFolkModels, viewType, dataObj){
// 	let viewTypeTitleMap = {
// 		root: 'All the Congress People',
// 		byState: `Showing Cuties from ${dataObj.state}`,
// 		byGenderAndParty: `Showing ${dataObj.party} Cuties that are ${dataObj.gender}`	
// 	}
// 
// 	let congressPeopleHtml = listOfCongressFolkModels.map( function(legislatorModel, viewType, dataObj){
// 		return `
// 			<div class="profile-card">
// 				<img src="http://flathash.com/${legislatorModel.get('bioguide_id')}">
// 				<h5>
// 					${legislatorModel.get('first_name')}</br>
// 					<small>${legislatorModel.get('state_name')}</small>
// 				</h5>
// 			</div>`
// 	}).join('')
// 	
// 	return `
// 		<h1>${viewTypeTitleMap[viewType]}</h1>
// 		<hr/>
// 		${congressPeopleHtml}
// 	`
// }
// EXTEND THE Backbone.Router to AppRouter constructor function


const AppRouter = Backbone.Router.extend({
	initialize: function(){
		console.log('app routing');
		Backbone.history.start()
	},
	
	routes : {
		'party/:prt/gender/:gndr' : 'showCongressPersonByPartyAndGender',
		'state/:st' : 'showCongressPersonByState', 
		'cutie/:bioId' : 'showSingleCongressPerson',
		'' : 'showCongressPersons'
	},
	
	showCongressPersons: function(){
		
		let cutieCollection = new CongressCutieCollection()
		cutieCollection.fetch().then(function(serverRes){
			let congressPersonsModelsList = cutieCollection.models
			let viewInstance = new MultiCongressView()
			
			viewInstance.render(congressPersonsModelsList, 'root', {})
		})

	},
	
	showCongressPersonByState: function(stateInRoute){
		let cutieColl = new CongressCutieCollection(`state=${stateInRoute}`) 
		cutieColl.fetch().then(function(serverRes){
			let congressPersonsModelsList = cutieColl.models
			let viewInstance = new MultiCongressView()
			viewInstance.render(congressPersonsModelsList, 'byState', {state: stateInRoute})
		})
	},

	showCongressPersonByPartyAndGender: function(prty, gendr){
		$.getJSON(`https://congress.api.sunlightfoundation.com/legislators?callback=?&party=${prty}&gender=${gendr}`)
			.then(function(serverRes){
				let congressPersonsModelsList = cutieColl.models
				let viewInstance = new MultiCongressView()
				viewInstance.render(congressPersonsResultsList, 'byGenderAndParty', {party: prty , gender: gendr})
			})

	},

	showSingleCongressPerson: function(bioId){
		let cutieModel = new CongressCutieModel(bioId)
		cutieModel.fetch().then(function(){
			let viewInstance = new SingleCongressView()
			viewInstance.render(cutieModel)
		})
	}
})


// Create new instance of AppRouter

const myApp = new AppRouter()

//https://openapi.etsy.com/v2/listings/active?api_key=3ba5kaxviji7en6d6o980dmr3ba5kaxviji7en6d6o980dmr


