import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { JWT_SECRET } from '../util/secret'

import UserService from '../services/users'

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    const userEmail = payload.email
    const foundUser = await UserService.findUserByEmail(userEmail)
    done(null, foundUser)
  }
)
