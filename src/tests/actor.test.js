require('../models')
const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');


let actorId;

const actor = {
    firstName: "Clive",
    lastName: "Owen",
    nationality: "United States",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Clive_Owen_%28Children_of_men%29_cropped.jpg/220px-Clive_Owen_%28Children_of_men%29_cropped.jpg",
    birthday:"1964-10-03"        
}

const BASE_URL='/api/v1/actors'

test("POST -> BASE_URL, should return statusCode 201 and res.body.firstName === actor.firstName", async()=>{

    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});


test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{

     const res = await request(app)
         .get(BASE_URL)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
    // console.log(res.body[0].movies)
      expect(res.body[0].movies).toBeDefined()
      expect(res.body[0].movies).toHaveLength(0)
 });

// //!DINAMIC ROUTES

 test("GET-> BASE_URL/genreId, should return statusCode 200 and res.body.firstName === actor.firstName", async()=>{

     const res = await request(app)
         .get(`${BASE_URL}/${actorId}`)
    
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(actor.firstName)

      expect(res.body.movies).toBeDefined()
      expect(res.body.movies).toHaveLength(0)
 });

test("PUT-> BASE_URL/genreId should return statusCode 200 and res.body.firstName === actor.firstName", async()=>{

    const actorUpdate = {
        firstName : "Owennn"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(actorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});


 test("DELTE-> BASE_URL/actorId should return statusCode 204", async()=>{

     const res = await request(app)
         .delete(`${BASE_URL}/${actorId}`)
    
     expect(res.statusCode).toBe(204)
 })