

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
		document.querySelector('#app-container').innerHTML = `
			<div class="profile-card">
				<img src="http://flathash.com/«bioguide_id»">
				<h5>
					«firstname»</br>
					<small>«state»</small>
				</h5>
			</div
		`
		
	}
	
	
})


// Create new instance of AppRouter

const myApp = new AppRouter()