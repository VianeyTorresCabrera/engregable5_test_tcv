require('../models')
const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');


let genreId;

const genre = {
    name: "Terror"    
}

const BASE_URL='/api/v1/genres'

test("POST -> BASE_URL, should return statusCode 201 and res.body.name === course.name", async()=>{

    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
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

 test("GET-> BASE_URL/genreId, should return statusCode 200 and res.body.name === course.name", async()=>{

     const res = await request(app)
         .get(`${BASE_URL}/${genreId}`)
    
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(genre.name)

      expect(res.body.movies).toBeDefined()
      expect(res.body.movies).toHaveLength(0)
 });

test("PUT-> BASE_URL/genreId should return statusCode 200 and res.body.name === course.name", async()=>{

    const genreUpdate = {
        name : "Comedia"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(genreUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genreUpdate.name)
});


 test("DELTE-> BASE_URL/genreId should return statusCode 204", async()=>{

     const res = await request(app)
         .delete(`${BASE_URL}/${genreId}`)
    
     expect(res.statusCode).toBe(204)
 })