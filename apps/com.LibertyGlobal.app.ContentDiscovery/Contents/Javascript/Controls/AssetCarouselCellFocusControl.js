var AssetCarouselCellFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellFocusControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			// this.Poster = new MAF.element.Image({
			// 	styles: {
			// 		height: 304,
			// 		width: 215,
			// 		position: 'relative',
			// 		display: 'inline-block'
			// 	}
			// }).appendTo(this);
			// this.Title = new MAF.element.Text({
			// 	styles: {
			// 		color: '#cecece',
			// 		fontFamily: 'InterstatePro-Light, sans-serif',
			// 		fontSize: 28,
			// 		vOffset: 19,
			// 		position: 'relative',
			// 		display: 'inline-block'
			// 	}
			// }).appendTo(this);
			// this.StartEnd = new MAF.element.Text({
			// 	styles: {
			// 		color: '#cecece',
			// 		fontFamily: 'InterstatePro-Light, sans-serif',
			// 		fontSize: 28,
			// 		position: 'relative',
			// 		display: 'inline-block'
			// 	}
			// }).appendTo(this);
			// this.Channel = new MAF.element.Image({
			// 	styles: {
			// 		width: 215,
			// 		position: 'relative',
			// 		display: 'inline-block'
			// 	}
			// }).appendTo(this);
		},		
	},

	config: {
		render: true,
		focus: true
	},

	initialize: function(){
		this.parent();
	},

	changeData: function(data){
		this.generateContents();
		// if(data !== undefined)
		// {			
		// 	this.Title.setText(data.title);
		// 	this.Poster.setSource(data.poster);
		// 	this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
		// 	this.Channel.setSource(data.channel_logo);
		// }
		// else
		// {
		// 	this.Title.setText('');	
		// 	this.Poster.setSource('');
		// 	this.StartEnd.setText('');	
		// 	this.Channel.setSource('');
		// }
	},

	suicide: function () {
		this.parent();
	}
});