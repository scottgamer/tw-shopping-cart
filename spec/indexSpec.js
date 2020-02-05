const ShoppingCart = require('../src/ShoppingCart.js');

describe('should run the app', () => {
  it('gets the price right with DIS_10', () => {
    const item = { name: 'foo', price: '10', productCode: 'DIS_10' };
    const shoppingCart = new ShoppingCart([item]);
    const results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(9);
  });

  it('should return all products', () => {
    const products = require('../src/data/products.json');
    expect(products.length).toEqual(10);
    expect(products[0].productCode).toEqual('CHAIR_RED');
    expect(products[1].productCode).toEqual('DIS_10-CHAIR_BLUE');
  });

  it('should get the price right with DIS_20', ()=>{
    const item = { name: 'foo', price: '20', productCode: 'DIS_20' };
    const shoppingCart = new ShoppingCart([item]);
    const results = shoppingCart.checkout();
    expect(results.totalPrice).toEqual(16);
  });
});
