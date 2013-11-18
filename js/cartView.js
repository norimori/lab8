/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

function createCartView(config) {
    config.cartModel = config.model; //Add model property.
    config.templateView = createCartItemView(config); //Add instance of cart item view.

    var view = createTemplateListView(config);
    //Update total price view.
    view.afterRender = function() {
    	this.totalPrice.html(this.model.getTotalPrice());
    }; //afterRender()

    return view;
} //createCartView()
