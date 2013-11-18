/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

//Create model object for the "cart" feature.
function createCartModel(config) {
	var model = createListModel(config); //creates new ListModel instance

	//Loop over model's items array to add up prices.
	model.getTotalPrice = function() {
		var i;
		var totalPrice = 0;
		for (i = 0; i < this.items.length; i++) {
			totalPrice += this.items[i].price;
		}
		return totalPrice.toFixed(2); //Up to 2 decimal places
	}; //getTotalPrice()

	//Returns JSON representation of cart items.
	model.toJSON = function() {
		return JSON.stringify(this.items);
	}; //toJSON()

	return model;
} //createCartModel()