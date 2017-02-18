

// EXTEND THE Backbone.Router to AppRouter constructor function

const AppRouter = Backbone.Router.extend({
	initialize: function(){
		console.log('app routing');
		Backbone.history.start()
	},
	
	routes : {
		'' : 'showCongressPersons'
	},
	
	showCongressPersons: function(){
		console.log('TIME TO SHOW SOME CONGRESS PERSONS')
		// document.querySelector('#app-container').innerHTML = 

		$.getJSON('https://congress.api.sunlightfoundation.com/legislators?callback=?')
			.then(function(serverRes){
				let congresspersonList = serverRes.results

				let congressPeopleHtml = congresspersonList.map( function(legislatorObj){
					return `
						<div class="profile-card">
							<img src="http://flathash.com/${legislatorObj.bioguide_id}">
							<h5>
								${legislatorObj.first_name}</br>
								<small>${legislatorObj.state_name}</small>
							</h5>
						</div>
					`
				}).join('')

				console.log(congressPeopleHtml)
				document.querySelector('#app-container').innerHTML = congressPeopleHtml
			})
		
	}
})


// Create new instance of AppRouter

const myApp = new AppRouter()