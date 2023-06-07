/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Pizzas').del()
  await knex('Toppings').del()
  await knex('Pizzas').insert([
    {id: 1, name: 'Position Absolute Acı Pizza', description: "Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir.", price:85.50},
    {id: 2, name: 'Terminal Pizza', description: "lorem ipsum sit o dolor color", price:60.00},
    {id: 3, name: 'useEffect Tavuklu Burger', description: "123lorem ipsum sit o dolor color", price:75.00},
  ]);
  await knex('Toppings').insert([
    {id: 1, name: 'Pepperoni' ,price: 5.00},
    {id: 2, name: 'Domates' ,price: 5.00},
    {id: 3, name: 'Mısır' ,price: 5.00},
    {id: 4, name: 'Yeşil Zeytin' ,price: 5.00},
    {id: 5, name: 'Sucuk' ,price: 5.00},
    {id: 6, name: 'Salam' ,price: 5.00},
    {id: 7, name: 'Sosis' ,price: 5.00},
    {id: 8, name: 'Avokado' ,price: 5.00}
  ]);
};
