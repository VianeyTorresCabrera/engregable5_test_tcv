require('../models')
const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');


let movieId;

const movie = {
    name: "El rey Arturo",
    image: "https://es.web.img2.acsta.net/pictures/16/02/10/13/43/275473.jpg",
    synopsis: "Arturo y los Caballeros de la Mesa Redonda emprenden una misión de rescate mientras hordas sajonas comienzan a invadir.",
    releaseYear: 2004  
}

const BASE_URL='/api/v1/movies'

test("POST -> BASE_URL, should return statusCode 201 and res.body.name === movie.name", async()=>{

    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});


test("GET -> BASE_URL, should return statusCode 200, and res.body.length===1", async()=>{

     const res = await request(app)
         .get(BASE_URL)

     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body).toHaveLength(1)
    // console.log(res.body[0].movies)
      expect(res.body[0].genres).toBeDefined()
      expect(res.body[0].genres).toHaveLength(0)
 });

// //!DINAMIC ROUTES

 test("GET-> BASE_URL/movieId, should return statusCode 200 and res.body.name === movie.name", async()=>{

     const res = await request(app)
         .get(`${BASE_URL}/${movieId}`)
    
     expect(res.statusCode).toBe(200)
     expect(res.body).toBeDefined()
     expect(res.body.name).toBe(movie.name)

     expect(res.body.genres).toBeDefined()
     expect(res.body.genres).toHaveLength(0)
 });

test("PUT-> BASE_URL/movieId should return statusCode 200 and res.body.name === movie.name", async()=>{

    const movieUpdate = {
        name : "El rey Leon"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});

test("POST ->BASE_URL/:id/genres, should return code 200, and res.body.legth === 1", async() =>{

    const genre = {
       name : "Accion"
    }

    const createGenres = await Genre.create(genre)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([createGenres.id])

    //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createGenres.id)
    await createGenres.destroy()
});

test("POST ->BASE_URL/:id/directors, should return code 200, and res.body.legth === 1", async() =>{

    const director = {
        firstName: "Antoinie",
        lastName: "Fuqua",
        nationality:"United States",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Antoine_Fuqua_%2829682821190%29.jpg/250px-Antoine_Fuqua_%2829682821190%29.jpg",
        birthday: "1965-05-30"
    }

    const createDirectors = await Director.create(director)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([createDirectors.id])

    //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createDirectors.id)
    await createDirectors.destroy()
});


test("POST ->BASE_URL/:id/actors, should return code 200, and res.body.legth === 1", async() =>{

    const actor = {
        firstName: "Clive",
        lastName: "Owen",
        nationality: "United States",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Clive_Owen_%28Children_of_men%29_cropped.jpg/220px-Clive_Owen_%28Children_of_men%29_cropped.jpg",
        birthday:"1964-10-03" 
    }

    const createActors = await Actor.create(actor)

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([createActors.id])

    //console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].id).toBe(createActors.id)
    await createActors.destroy()
})



 test("DELETE-> BASE_URL/movieId should return statusCode 204", async()=>{

     const res = await request(app)
         .delete(`${BASE_URL}/${movieId}`)
    
     expect(res.statusCode).toBe(204)
 })