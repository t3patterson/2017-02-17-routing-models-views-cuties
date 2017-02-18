
function congressCutieTemplate(listOfCongressFolk, viewType, dataObj){
	let viewTypeTitleMap = {
		root: 'All the Congress People',
		byState: `Showing Cuties from ${dataObj.state}`,
		byGenderAndParty: `Showing ${dataObj.party} Cuties that are ${dataObj.gender}`	
	}

	let congressPeopleHtml = listOfCongressFolk.map( function(legislatorObj, viewType, dataObj){
		return `
			<div class="profile-card">
				<img src="http://flathash.com/${legislatorObj.bioguide_id}">
				<h5>
					${legislatorObj.first_name}</br>
					<small>${legislatorObj.state_name}</small>
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
		$.getJSON('https://congress.api.sunlightfoundation.com/legislators?callback=?')
			.then(function(serverRes){
				let congressPersonsResultsList = serverRes.results
				let bigHTMLStr = congressCutieTemplate(congressPersonsResultsList, 'root', {})
				document.querySelector('#app-container').innerHTML = bigHTMLStr
			})
		
	},
	
	
	showCongressPersonByState: function(stateInRoute){
		document.querySelector('#app-container').innerHTML = `<h2>${stateInRoute}</h2>`
		$.getJSON(`https://congress.api.sunlightfoundation.com/legislators?callback=?&state=${stateInRoute}`)
			.then(function(serverRes){
				let congressPersonsResultsList = serverRes.results
				let bigHTMLStr = congressCutieTemplate(congressPersonsResultsList, 'byState', {state: stateInRoute})
				document.querySelector('#app-container').innerHTML = bigHTMLStr
		})
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