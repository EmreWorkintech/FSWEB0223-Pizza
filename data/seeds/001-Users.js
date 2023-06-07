/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()  
  //truncate
  await knex('Users').insert([
    {id: 1, firstName: 'Emre', lastName: "Şahiner", password: "1234", email: "emre@wit.com.tr", phoneNumber: "05321234567", roleName: "Admin"},
    {id: 2, firstName: 'Erdem', lastName: "Günay", password: "1234", email: "erdem@wit.com.tr", phoneNumber: "05321234567", roleName: "User"},
    {id: 3, firstName: 'Ayşe', lastName: "XYZ", password: "1234", email: "ayse@wit.com.tr", phoneNumber: "05441234567", roleName: "User"},
    {id: 4, firstName: 'Baha', lastName: "123", password: "1234", email: "baha@wit.com.tr", phoneNumber: "05301234567", roleName: "Admin"}
  ]);
};
