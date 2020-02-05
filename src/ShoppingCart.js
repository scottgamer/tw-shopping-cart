'use strict';

/**
* Calculates total price and total loyalty points earned by the customer.
* Products with product code starting with DIS_10 have a 10% discount applied.
* Products with product code starting with DIS_15 have a 15% discount applied.
* Loyalty points are earned more when the product is not under any offer.
    - Customer earns 1 point on every $5 purchase.
    - Customer earns 1 point on every $10 spent on a product with 10% discount.
    - Customer earns 1 point on every $15 spent on a product with 15% discount.
*/
module.exports = function(items) {
  function checkout() {
    let totalPrice = 0;
    let loyaltyPoints = 0;

    items.forEach(item => {
      let discount = 0;

      if (item.productCode.startsWith('DIS_10')) {
        discount = item.price * 0.1;
        loyaltyPoints += item.price / 10;
      } else if (item.productCode.startsWith('DIS_15')) {
        discount = item.price * 0.15;
        loyaltyPoints += item.price / 15;
      } else if (item.productCode.startsWith('DIS_20')) {
        discount = item.price * 0.2;
        loyaltyPoints += item.price / 20;
      } else {
        loyaltyPoints += item.price / 5;
      }

      totalPrice += item.price - discount;

      if (totalPrice >= 500) {
        discount = totalPrice * 0.05;
        totalPrice -= discount;
      }
    });
    return { totalPrice: totalPrice, loyaltyPoints: loyaltyPoints };
  }

  return {
    checkout: checkout
  };
};
