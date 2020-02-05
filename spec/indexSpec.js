var ShoppingCart = require('../src/ShoppingCart.js')

describe('should run the app', function() {

  it('gets the price right with DIS_10', function() {
    var item = {name: "foo", price: "10", productCode: "DIS_10"}
    var shoppingCart = new ShoppingCart([item]);
    var results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(9);
  });

  xit('should return all products', function() {
    const products = require('../src/data/products.json')
    expect(products).toEqual(2);
    expect(products[0].productCode).toEqual("CHAIR_RED");
    expect(products[1].productCode).toEqual("DIS_10-CHAIR_BLUE");
  });

});
