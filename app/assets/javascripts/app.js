App = Ember.Application.create();

App.Router.map(function() {
	this.resource('book', { path: '/books/:book_id' });
	this.resource('genre', { path: '/genres/:genre_id' })
	this.resource('reviews', function() {
		this.route('new');
	});
});

/*-------------------ROUTES---------------------------*/
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({  //Will use RSVP object if I don't change something
    	books: this.store.findAll('book'),
    	genres: this.store.findAll('genre')
    }); 
  },
  setupController: function(controller, model){
  	controller.set('books', model.books );
  	controller.set('genres', model.genres);
  }
});

App.ReviewsNewRoute = Ember.Route.extend({
	model: function() {
	    return Ember.RSVP.hash({  //Will use RSVP object if I don't change something
	    	book: this.store.createRecord('book'),
	    	genres: this.store.findAll('genre')
	    }); 
  	},
  	setupController: function(controller, model){
  		controller.set('model', model.book);
  		controller.set('genres', model.genres);
  	},
  	actions: {
  		willTransition: function(transition) {
  			if(this.currentModel.book.get('isNew')) {
  				if(confirm("Are you sure you want to abandon progress?")) {
  					this.currentModel.book.destroyRecord();
  				} else {
  					transition.abort();
  				}
  			}
  		}
  	}
});

/*-------------------CONTROLLERS----------------------*/
App.BooksController = Ember.ArrayController.extend({
	sortProperties: ['title']
});

App.IndexController = Ember.Controller.extend({

})

App.GenresController = Ember.ArrayController.extend({
	sortProperties: ['name']
});

App.ReviewsNewController = Ember.Controller.extend({
	ratings: [5,4,3,2,1],
	actions: {
		createReview: function() {
			var controller = this;
			this.get('model').save().then(function() {
				controller.transitionToRoute('index');
			});
		}
	}
});

/*-------------------ADAPTERS-------------------------*/
App.ApplicationAdapter = DS.ActiveModelAdapter.extend({

});

/*-------------------COMPONENTS-----------------------*/
App.BookDetailsComponent = Ember.Component.extend({
	classNameBindings: ['ratingClass'],
	ratingClass: function() {
		return "rating-" + this.get('book.rating');
	}.property('book.rating')
});

/*-------------------MODELS---------------------------*/
App.Book = DS.Model.extend({
	title: DS.attr(),
	author: DS.attr(),
	description: DS.attr(),
	rating: DS.attr('number'),
	amazon_id: DS.attr(),
	genre: DS.belongsTo('genre', {async: true}),
	url: function(){
		return "http://www.amazon.com/gp/product/"+this.get('amazon_id');
	}.property('amazon_id'),
	image: function(){
		return "http://images.amazon.com/images/P/"+this.get('amazon_id') + ".01.ZTZZZZZZZ.jpg";
	}.property('amazon_id')
});

App.Genre = DS.Model.extend({
	name: DS.attr(),
	books: DS.hasMany('book', {async: true})
});

/*------------------FIXTURES--------------------------*/
App.Book.FIXTURES = [
	{
	  id:1,
	  title: "Hyperion",
	  author: "Dan Simmons",
	  description: "Probably my favorite science fiction book (and series) I've ever read. Hyperion is written in a style similar to The Canterbury Tales, in which a series of stories are told by the main characters. Each story is a gem in itself, but alude to the larger storyline. The scope of the story is ambitious - spanning time, planets religion and love.",
	  amazon_id: "0553283685",
	  rating: 5,
	  amazon_id: '0553283685',
	  genre: 1
	},
	{
	  id:2,
	  title: "Jony Ive: The Genius Behind Apple's Greatest Products",
	  author: "Leander Kahney",
	  description: "Even though I respect Ive, I felt this biography only hit skin deep. It went over all the major events in his life, his passion for design, awards he achieved -- but that's really it. I dont't feel I know him anymore than before reading this.",
	  amazon_id: "159184617X",
	  rating: 2,
	  amazon_id: '159184617X',
	  genre: 3
	},
	{
	  id:3,
	  title: "Mindstorms",
	  author: "Seymour A. Papert",
	  description: "Although this book focuses on the cognitive advantages to having children use technology from an early age, it is also an in depth look at how people can learn for themseves. As someone who was often distracted and bored at times during school, Mindstorms highlights some of the reasoning behind that feeling and what we can do as teachers to help minimize it.",
	  amazon_id: "0465046746",
	  rating: 5,
	  amazon_id: '0465046746',
	  genre: 3
	}
];

App.Genre.FIXTURES = [
	{
		id: 1,
		name: 'Science Fiction',
		books: [1]
	},
	{
		id: 2,
		name: 'Fiction'
	},
	{
		id: 3,
		name: 'Non-Fiction',
		books: [2,3]
	}
];