
const MultiCongressView = Backbone.View.extend({
	el: '#app-container',

	events: {
		"click .profile-card" : "handleCardClick"
	},
	
	handleCardClick: function(evt){
		console.log(evt.target)
		let clickedCardEl = evt.target
		console.log(clickedCardEl.dataset.bioid)
		window.location.hash = `cutie/${clickedCardEl.dataset.bioid}`
	},
	
	_singleCutieHtmlTemplate: function(legislatorModel){
		return `
			<div class="profile-card" data-bioid="${legislatorModel.get('bioguide_id')}">
				<img src="http://flathash.com/${legislatorModel.get('bioguide_id')}">
				<h5>
					${legislatorModel.get('first_name')}</br>
					<small>${legislatorModel.get('state_name')}</small>
				</h5>
			</div>`
	},

	_buildHtmlTemplate: function(listOfCongressFolkModels, viewType, dataObj){
		let viewTypeTitleMap = {
			root: 'All the Congress People',
			byState: `Showing Cuties from ${dataObj.state}`,
			byGenderAndParty: `Showing ${dataObj.party} Cuties that are ${dataObj.gender}`	
		}

		return `
			<h1>${viewTypeTitleMap[viewType]}</h1>
			<hr/>
			${listOfCongressFolkModels.map( this._singleCutieHtmlTemplate ).join('')}
		`
	},
	
	render: function(listOfCongressFolkModels, viewType, dataObj){
		this.el.innerHTML = this._buildHtmlTemplate(listOfCongressFolkModels, viewType, dataObj)
	}
})


const SingleCongressView = Backbone.View.extend({
	el : '#app-container',

	_buildHtmlTemplate: function(model){
		return `	 
			 <h3><a href="">HOME</a></h3>
		    <div class="single-profile">
		          <div class="main">
		           <img src="http://flathash.com/${model.get('bioguide_id')}" />'
		           <h4> &hearts; ${model.get('district')}  </h4>
		           <button class="add-to-favs" data-bio="${model.get('bioguide_id')}">+</button>
		          </div>'
		          <div class="details">
		           <h3>  ${model.get('first_name')}   </h3>
		           <h6>D.O.B:</h6>
		           <p>  ${model.get('birthday')} </p>
		           <h6>Address:</h6>
		           <p>   ${model.get('office')}   </p>
		           <h6>Originally From:</h6>
		           <p>   ${model.get('state_name')}   </p>
		             <h6>Member Since:</h6>
		           <p>   ${model.get('term_start')}   </p>
		           <h6>Get in Touch:</h6>
		           <p>   ${model.get('oc_email')}   <br/>|  model.get('phone')    |</p>
		           <h6>[R]elaxed or [D]emanding:</h6>
		           <p>  ${model.get('party')}   </p>
		          </div>
		       </div> 
		`

	},

	render: function(data){
		this.el.innerHTML = this._buildHtmlTemplate(data)
	}
})
   