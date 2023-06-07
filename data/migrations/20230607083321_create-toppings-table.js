/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("Toppings", tbl=>{
    tbl.increments();
    tbl.string('name', 32)
        .notNullable()
        .unique();
    tbl.decimal('price')
        .notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('Toppings')
};