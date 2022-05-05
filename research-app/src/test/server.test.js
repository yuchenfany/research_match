/*eslint-disable*/
// import supertest
const request = require('supertest');

// import our web app
const webapp = require('../../server/server');

// Import database operations
const dbo = require('../../server/db/conn');

beforeAll(async () =>{
    webapp.listen();
    await dbo.connectToServer(url);
});

describe('/login endpoint tests',  ()=> {
    test('/login endpoint status code and response 404', ()=>{
        //construct a supertest request with our app
        // send an HTTP POST request with data (body)
        return request(webapp).post('/record/login')
        .send({player:'', points:3}).expect(404)
        .then((response)=> expect(JSON.parse(response.text).error).toBe('username not provided'));
    });

     test('status code 201 and response', () =>{
        return request(webapp).post('/login')
        .send({username:'testuser', password:'testuserpass'})
        .expect(201) // test the response status code
         // process the response
        .then((response)=> expect(JSON.parse(response.text).message).toContain('Player with id'));
    }); 
});