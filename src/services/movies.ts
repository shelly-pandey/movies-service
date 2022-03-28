import Movie, { MovieDocument } from '../models/Movie'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: MovieDocument): Promise<MovieDocument> => {
  return product.save()
}

const findById = async (id: string): Promise<MovieDocument> => {
  const foundMovie = await Movie.findById(id)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${id} not found`)
  }

  return foundMovie
}

const findAllData = async (): Promise<MovieDocument[]> => {
  return Movie.find().sort({ id: 1, title: -1 })
}

const updateMovie = async (
  id: string,
  update: Partial<MovieDocument>
): Promise<MovieDocument | null> => {
  const foundMovie = await Movie.findByIdAndUpdate(id, update, {
    new: true,
  })

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${id} not found`)
  }

  return foundMovie
}

const deleteMovie = async (id: string): Promise<MovieDocument | null> => {
  const foundMovie = Movie.findByIdAndDelete(id)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${id} not found`)
  }

  return foundMovie
}

export default { create, findById, findAllData, updateMovie, deleteMovie }
