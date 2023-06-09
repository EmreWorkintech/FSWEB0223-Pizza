const User = require('../api/users/users-model');
const db = require('../data/db-config');

/*
describe bloğu içerisinde testleri grupluyoruz.
nested olrak describe tekrar kullanılabilir.
beforeAll, beforeEach, afterAll, afterEach

test.todo('açıklama');
test.only('test 1', ()=> {...});
test.skip('test 2', ()=> {...});

.todo, .only, .skip birden fazla kullanılabilir.
*/

const newAdminUser = {
    firstName: 'Erhan', 
    lastName: "Topuz", 
    password: "1234", 
    email: "erhan@wit.com.tr", 
    phoneNumber: "05321234567", 
    roleName: "Admin"}

const newUserUser = {
    firstName: 'Ayşe', 
    lastName: "Topuz", 
    password: "1234", 
    email: "ayse@wit.com.tr", 
    phoneNumber: "05321234567", 
    roleName: "User"}

//! her test öncekilerden bağımsız çalışmalı!!!!

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})


test('Sanity check', ()=> {
    expect(process.env.NODE_ENV).toBe('testing');
})

test('empty test gets success', ()=>{});

describe('SUCCESS TESTLERI', ()=> {   //!describe'da async yok!!!

    test('creates admin user', async ()=> {
        const user = await User.create(newAdminUser);
        //assertion
        expect(user).toHaveProperty('id');
        expect(user.id).toBe(5);
        expect(user).toHaveProperty('id', 5);
    })

    describe('tests for spesific user', ()=> { 
        let user;
        beforeAll(async ()=>{
            user = await User.getById(3);
        })

        test('gets user by id', async ()=> {
            const expectedUser = {id: 3, firstName: 'Ayşe', lastName: "XYZ", email: "ayse@wit.com.tr", phoneNumber: "05441234567", roleName: "User"}
            expect(user).not.toBe(expectedUser);
            expect(user).toEqual(expectedUser);
            expect(user).toMatchObject({id: 3, firstName: 'Ayşe', lastName: "XYZ"});
        })
    
        test('checks property values for spesific user', async ()=> {
            expect(user.firstName).toMatch(/yş/);  //case sensitive
            expect(user.firstName).not.toMatch(/yŞ/); //!case sensitive
            expect(user.firstName).toMatch(/yŞ/i); // /i ignores case sensitivity
        })

    })


})