/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Order_Pizza_Toppings').del()
  await knex('Order_Pizzas').del()
  await knex('Orders').del()

  await knex('Orders').insert([
    {id: 1, status: 'Hazırlanıyor', note: "acı olmasın", totalPrice: 100.50, user_id: 2, created_at: "2023-06-07 12:00:01", updated_at:"2023-06-07 12:00:01"},
    {id: 2, status: 'Sipariş alındı', totalPrice: 120.50, user_id: 4, created_at: "2023-06-07 12:00:01", updated_at:"2023-06-07 12:00:01"},
    {id: 3, status: 'Teslim edildi', totalPrice: 120.50, user_id: 3, created_at: "2023-06-07 12:00:01", updated_at:"2023-06-07 12:00:01"},
  ]);

  await knex('Order_Pizzas').insert([
    {id: 1, count: 1, size: "Büyük", dough: "Kalın", pizza_id:1, order_id: 1},
    {id: 2, count: 2, size: "Küçük", dough: "İnce", pizza_id:2, order_id: 1},
    {id: 3, count: 1, size: "Küçük", dough: "Kalın", pizza_id:3, order_id: 2},
    {id: 4, count: 1, size: "Orta", dough: "İnce", pizza_id:1, order_id: 3},
  ]);
  
  await knex('Order_Pizza_Toppings').insert([
    {topping_id: 1, order_pizza_id: 1},
    {topping_id: 2, order_pizza_id: 1},
    {topping_id: 4, order_pizza_id: 1},
    {topping_id: 5, order_pizza_id: 1},
    {topping_id: 8, order_pizza_id: 1},
    {topping_id: 8, order_pizza_id: 2},
    {topping_id: 3, order_pizza_id: 3},
    {topping_id: 5, order_pizza_id: 3},
  ]);
};
