import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../util/secret'

const createUser = async (User: UserDocument): Promise<UserDocument> => {
  return User.save()
}

async function findUserByEmail(email?: string): Promise<UserDocument | null> {
  const user = await User.findOne({ email })
  return user
}

async function findOrCreate(payload: Partial<UserDocument>) {
  return User.findOne({
    email: payload.email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        const newUser = new User({
          email: payload.email,
          firstName: payload.firstName,
          lastName: payload.lastName,
        })

        newUser.save()
        return newUser
      }
      return user
    })
}

const findAllUsers = async (): Promise<UserDocument[]> => {
  return User.find().select('-password')
}

const updateUser = async (
  id: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(id, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${id} not found`)
  }

  return foundUser
}

const deleteUser = async (id: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(id)

  if (!foundUser) {
    throw new NotFoundError(`User ${id} not found`)
  }

  return foundUser
}

const findUserById = async (id: string): Promise<UserDocument> => {
  const foundUser = await User.findById(id)
  if (!foundUser) {
    throw new NotFoundError(`User ${id} not found`)
  }

  return foundUser
}

const addMoviesToUser = async (
  userId: string,
  movieId: any
): Promise<UserDocument> => {
  const user = await User.findById(userId)

  if (!user) {
    throw new NotFoundError(`User with  ${userId} not found`)
  }
  user.itemsInCart.push(movieId)
  return user.save()
}

const generateToken = (user: Partial<UserDocument>) => {
  const { email, id, isAdmin } = user

  const token = jwt.sign({ email, id, isAdmin }, 'JWT_SECRET', {
    expiresIn: 500,
  })

  return token
}

export default {
  createUser,
  findUserByEmail,
  findAllUsers,
  updateUser,
  deleteUser,
  findUserById,
  addMoviesToUser,
  findOrCreate,
  generateToken,
}
