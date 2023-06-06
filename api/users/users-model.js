const db = require('../../data/db-config');


function getAll() {
    return db('Users').
                select("id", 
                        "firstName", 
                        "lastName",
                        "phoneNumber", 
                        "email",
                        "roleName");  //collection, []
}

function getById(id) {
    return db('Users')
                .where("id", id)
                .select("id", 
                        "firstName", 
                        "lastName",
                        "phoneNumber", 
                        "email",
                        "roleName")
                .first();  //object

}

function getByFilter(filter) {
    return db('Users')
                .where(filter);  //collection

}

async function remove(id) {
     const count = await db('users').where("id", id).delete();
     return count;
}

async function create(payload) {
    const [id] = await db('users').insert(payload);
    return getById(id);
}

async function update(id, payload) {
    const count = await db('users').where("id", id).update(payload);
    return count;
}


module.exports = {
    getAll,
    getById,
    create,
    getByFilter,
    remove,
    update,
}