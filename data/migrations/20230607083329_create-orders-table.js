/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("Orders", tbl=>{
      tbl.increments();
      tbl.string('status', 32)
        .notNullable()
        .defaultTo("Sipariş alındı");
      tbl.string('note');
      tbl.decimal('totalPrice')
          .notNullable()
          .unsigned();
      tbl.timestamps();
      tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
    .createTable('Order_Pizzas', tbl=>{
        tbl.increments();
        tbl.integer('count')
            .unsigned()
            .notNullable();
        tbl.string('size', 32)
            .notNullable();
        tbl.string('dough', 32)
            .notNullable();
        tbl.integer('pizza_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Pizzas')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        tbl.integer('order_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Orders')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        
    })
    .createTable('Order_Pizza_Toppings', tbl=>{
        tbl.integer('topping_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Toppings')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        tbl.integer('order_pizza_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('Order_Pizzas')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.primary(["topping_id", "order_pizza_id"])
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Order_Pizza_Toppings')
    .dropTableIfExists('Order_Pizzas')
    .dropTableIfExists('Orders')
  };
  