/* eslint-disable @typescript-eslint/member-delimiter-style */
import mongoose, { Document } from 'mongoose'

export type MovieDocument = Document & {
  id: { type: number; unique: true }
  title: string
  year: string
  genres: [string]
  director: string
  stars: { rate: number; count: number }
  description: string
  image: string
}

const movieSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  year: String,
  genres: [String],
  director: String,
  stars: { rate: Number, count: Number },
  description: String,
  image: String
})

export default mongoose.model<MovieDocument>('Movie', movieSchema)
