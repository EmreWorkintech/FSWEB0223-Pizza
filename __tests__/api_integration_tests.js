const server = require('../api/server');
const request = require('supertest');

const db = require('../data/db-config');

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

/*
request(server).METHOD(URL)  //response dönüyor: header, body, status
request(server).get(URL); 
request(server).post(URL).send(PAYLOAD); //send ile data yolluyoruz
request(server).get(URL).set(KEY,VALUE); //set ile header'a set etmek için
*/

const newAdminUser = {
    firstName: 'Erhan', 
    lastName: "Topuz", 
    password: "1234", 
    email: "erhan@wit.com.tr", 
    phoneNumber: "05321234567", 
    roleName: "Admin"}

describe('___AUTH____', ()=> {   //!describe'da async yok!!!


    test('create a new user', async ()=> {

        const res = await request(server).post('/api/auth/register').send(newAdminUser);
        const user = await db('Users').where({
            firstName: 'Erhan', 
            lastName: "Topuz"}).first();
        //assertion
        expect(res.status).toBe(201);
        expect(res.body.message).toBe('Merhaba Erhan...');
        expect(true).toBe(res.body.message.includes(user.firstName));

    })

    test('new user can login', async ()=> {

        await request(server).post('/api/auth/register').send(newAdminUser);
        const res = await request(server).post('/api/auth/login').send(newAdminUser);
        //assertion
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();

    })

    test('user can logout', async ()=> {

        await request(server).post('/api/auth/register').send(newAdminUser);
        const res = await request(server).post('/api/auth/login').send(newAdminUser);
        const token = res.body.token;

        await request(server).get('/api/auth/logout').set('Authorization', token);
        const res2 = await request(server).get('/api/users').set('Authorization', token);
        //assertion
        expect(res2.status).toBe(403);

    })


    
})


describe('___USERS____', ()=> {   //!describe'da async yok!!!
    let token;
    beforeEach(async ()=> {
        await request(server).post('/api/auth/register').send(newAdminUser);
        const res = await request(server).post('/api/auth/login').send(newAdminUser);
        token = res.body.token;
    })

    test('create a new user', async ()=> {

        const res = await request(server).get('/api/users').set('Authorization', token);
        //assertion
        expect(res.body).toHaveLength(5);

    })

    
})