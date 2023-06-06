/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    
    return knex.schema.createTable("Users", tbl=>{
        tbl.increments(); //id
        tbl.string("firstName", 64)
            .notNullable();
        tbl.string("lastName", 64)
            .notNullable();
        tbl.string("password")  //hashed password=>bcryptjs
            .notNullable();
        tbl.string("phoneNumber", 11);
        tbl.string("email")
            .notNullable();
        tbl.string("roleName", 16)
            .notNullable()
            .defaultTo("User");
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users')
};
