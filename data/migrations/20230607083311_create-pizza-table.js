/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("Pizzas", tbl=>{
    tbl.increments();
    tbl.string('name', 64)
        .notNullable()
        .unique();
    tbl.string('description')
        .notNullable();
    tbl.decimal('price')
        .notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Pizzas')
};
