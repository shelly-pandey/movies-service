import mongoose, { Document } from 'mongoose'

export type ItemInCart = {
  products: string
  quantity: number
}

export type UserDocument = Document & {
  username: string
  unique: true
  firstName: string
  lastName: string
  email: string
  address: string
  password: string
  isBanned: boolean
  isAdmin: boolean
  itemsInCart: ItemInCart[]
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  password: { type: String },
  isBanned: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },

  itemsInCart: [
    {
      movies: { type: mongoose.Types.ObjectId, ref: 'Movie' },
      quantity: Number,
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
