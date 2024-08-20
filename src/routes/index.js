const express = require('express');
const routerGenre = require('./genre.routes');
const routerActor = require('./actor.routes');
const routerDirector = require('./director.routes');
const routerMovie = require('./movie.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres',routerGenre)
router.use('/actors',routerActor)
router.use('/directors',routerDirector)
router.use('/movies',routerMovie)
module.exports = router;