const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


Movie.belongsToMany(Genre, {through: 'movieGenres'})
Genre.belongsToMany(Movie, {through: 'movieGenres'})

Movie.belongsToMany(Actor, {through: 'movieActors'})
Actor.belongsToMany(Movie, {through: 'movieActors'})

Movie.belongsToMany(Director, {through: 'movieDirectors'})
Director.belongsToMany(Movie, {through: 'movieDirectors'})