import express from 'express'
import dotenv from 'dotenv'

import moviesRouter from './routers/movies'
import usersRouter from './routers/users'

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import passport from 'passport'
import { jwtStrategy } from './config/passport'
import cors from 'cors'



dotenv.config({ path: '.env' })
const app = express()



// Express configuration
app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(express.json())

app.use(cors())

app.use(apiContentType)
// Use common 3rd-party middlewares
app.use(express.json())



passport.use(jwtStrategy)

// Use products router
app.use('/api/v1/movies', moviesRouter)

// Use users router
app.use('/api/v1/users', usersRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
