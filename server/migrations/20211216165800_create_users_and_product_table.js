
exports.up = function(knex) {
    return knex.schema
    .createTable('user', (table) => {
        table.increments('id').primary();
        table.string('userName').notNullable();
        table.string('password').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('product', (table) => {
        table.increments('id').primary();
        table.string('productName').notNullable();
        table.string('description', 10000);
        table.string('category');
        table.string('color');
        table.string('picUrlPath');
        table.string('likes');
        table.string('stock');
        table.string('price');
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('order', (table) => {
        table.increments('id').primary();
        table.string('productName').notNullable();
        table.integer('productId').notNullable();;
        table.string('picUrlPath');
        table.string('orderPrice');
        table.boolean('fulfilled');
        table.timestamp('timeStamp').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user').dropTable('product')
};
