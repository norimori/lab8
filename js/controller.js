/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	var formatLabels = {
	    dvd: 'DVD',
	    bluray: 'Blu-Ray'
	};

	var cartModel = createCartModel(); //create cart
	var cartView = createCartView({ //create cart view
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		totalPrice: $('.total-price')
	});


	var moviesModel = createMoviesModel({ //create movie
	    url: 'https://courses.washington.edu/info343/ajax/movies/' //location of movie's JSON data
	});

	var moviesView = createMoviesView({ //create movie view
	    model: moviesModel,
	    template: $('.movie-template'),
	    container: $('.movies-container')
	});

	//refresh to get movies from server
	moviesModel.refresh();

}); //doc ready()

