import { Request, Response, NextFunction } from 'express'

import MovieService from '../services/movies'
import Movie from '../models/Movie'
import { BadRequestError } from '../helpers/apiError'

export const createMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, title, year, genres, director, stars, description, image } = req.body
    const product = new Movie({
      id,
      title,
      year,
      genres,
      director,
      stars,
      description,
      image,
    })

    await MovieService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const updateMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const id = req.params.id
    const updatedMovie = await MovieService.updateMovie(id, update)
    res.json(updatedMovie)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const deleteMovie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await MovieService.deleteMovie(req.params.id))
    //res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findMovieById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await MovieService.findById(req.params.id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findAllMovies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await MovieService.findAllData())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
