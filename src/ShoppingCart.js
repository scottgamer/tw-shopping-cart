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
    let bulkProductsWithOffer = [];

    items.forEach(item => {
      let discount = 0;
      const tempItem = { ...item };

      // Two products with same promo code
      if (
        tempItem.productCode.startsWith('BULK_BUY_2_GET_1') &&
        bulkProductsWithOffer.length >= 1
      ) {
        tempItem.price = 0;
        bulkProductsWithOffer = [];
      } else if (tempItem.productCode.startsWith('BULK_BUY_2_GET_1')) {
        bulkProductsWithOffer.push(tempItem);
      } else if (tempItem.productCode.startsWith('DIS_10')) {
        discount = tempItem.price * 0.1;
        loyaltyPoints += tempItem.price / 10;
      } else if (tempItem.productCode.startsWith('DIS_15')) {
        discount = tempItem.price * 0.15;
        loyaltyPoints += tempItem.price / 15;
      } else if (tempItem.productCode.startsWith('DIS_20')) {
        discount = tempItem.price * 0.2;
        loyaltyPoints += tempItem.price / 20;
      } else {
        loyaltyPoints += tempItem.price / 5;
      }

      totalPrice += tempItem.price - discount;

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
