import express from 'express'

import {
  createMovie,
  deleteMovie,
  findAllMovies,
  updateMovie,
  findMovieById,
} from '../controllers/movies'

const productsRouter = express.Router()

productsRouter.get('/', findAllMovies)
productsRouter.get('/:id', findMovieById)
productsRouter.post('/movie', createMovie)
productsRouter.put('/:id', updateMovie)
productsRouter.delete('/:id', deleteMovie)

export default productsRouter
