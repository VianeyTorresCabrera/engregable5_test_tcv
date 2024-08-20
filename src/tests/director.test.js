require('../models')
const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');


let directorId;

const director = {
    firstName: "Antoinie",
    lastName: "Fuqua",
    nationality:"United States",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Antoine_Fuqua_%2829682821190%29.jpg/250px-Antoine_Fuqua_%2829682821190%29.jpg",
    birthday: "1965-05-30"   
}

const BASE_URL='/api/v1/directors'

test("POST -> BASE_URL, should return statusCode 201 and res.body.firstname === course.firstname", async()=>{

    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});


test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{

     const res = await request(app)
         .get(BASE_URL)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
    //console.log(res.body[0].movies)
      expect(res.body[0].movies).toBeDefined()
      expect(res.body[0].movies).toHaveLength(0)
 });

// //!DINAMIC ROUTES

 test("GET-> BASE_URL/genreId, should return statusCode 200 and res.body.name === director.firstName", async()=>{

     const res = await request(app)
         .get(`${BASE_URL}/${directorId}`)
    
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.firstName).toBe(director.firstName)

       expect(res.body.movies).toBeDefined()
       expect(res.body.movies).toHaveLength(0)
 });

test("PUT-> BASE_URL/directorId should return statusCode 200 and res.body.name === director.firstName", async()=>{

    const directorUpdate = {
        firstName : "Anton"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(directorUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(directorUpdate.firstName)
});


 test("DELTE-> BASE_URL/directorId should return statusCode 204", async()=>{

     const res = await request(app)
         .delete(`${BASE_URL}/${directorId}`)
    
     expect(res.statusCode).toBe(204)
 })