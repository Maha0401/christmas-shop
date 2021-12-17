const productData = require('./seed_data/product');
const userData = require('./seed_data/user');
const orderData = require('./seed_data/order');

exports.seed = function (knex) {
  return knex('product')
    .del()
    .then(function () {
      return knex('product').insert(productData);
    })
    .then(() => {
      return knex('user').del();
    })
    .then(() => {
      return knex('user').insert(userData);
    })
    .then(() => {
      return knex('order').del();
    })
    .then(() => {
      return knex('order').insert(orderData);
    });
};
