/* controller.js
    Controller for Shopping Cart page
*/

$(function(){
	var formatLabels = {
	    dvd: 'DVD',
	    bluray: 'Blu-Ray'
	};

	var cartModel = createCartModel(); //create cart

	//Restore cart items from local storage JSON data
	var cartJSON = localStorage.getItem('cart');
	if (cartJSON && cartJSON.length > 0) {
	    cartModel.setItems(JSON.parse(cartJSON));
	}
	
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


	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//movieID and format
	moviesView.on('addToCart', function(data){
	    var movie = moviesModel.getItem(data.movieID);
	    if (!movie)
	        throw 'Invalid movie ID "' + movieID + '"!'; 

	    cartModel.addItem({
	        id: movie.id,
	        title: movie.title,
	        format: data.format,
	        formatLabel: formatLabels[data.format],
	        price: movie.prices[data.format]
	    });
	}); //addToCart event

	//Placing an order
	$('.place-order').click(function() {
		$.ajax({
		    url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
		    type: 'POST',
		    data: cartModel.toJSON(),
		    contentType: 'application/json',
		    success: function(responseData) {
		        alert(responseData.message);
		        cartModel.setItems([]); //Order has now been posted, reset cart.
		    },
		    error: function(jqXHR, status, errorThrown) {
		        //error with post--alert user
		        alert(errorThrown || status);
		    }
		}); //ajax()
	});

	//Save cart items to local storage.
	cartModel.on('change', function(){
    	localStorage.setItem('cart', cartModel.toJSON());
	});
	
}); //doc ready()

