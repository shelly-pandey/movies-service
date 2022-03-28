import request from 'supertest'

import { UserDocument } from '../../src/models/User'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingUserId = '5e57b77b5744fa0b461c7906'

async function createUser(override?: Partial<UserDocument>) {
  let User = {
  email: 'brock@gmail.com',
  firstName: 'brock',
  lastName: 'lesner',
  username: 'iambrock',
  password: 'mission@009',
  address : 'somewhere'
  }

  if (override) {
    User = { ...User, ...override }
  }

  return await request(app).post('/api/v1/users/user').send(User)
}

describe('User controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  // POST CREATE
  it('should create a user', async () => {
    const res = await createUser()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.firstName).toBe('brock')
  })

  // POST CREATE - WRONG DATA TYPE
  it('should not create a user with wrong data', async () => {
    const res = await request(app)
      .post('/api/v1/users/user')
      .send({
        //email: 'brock@gmail.com',
        firstName: 'brock',
        lastName: 'lesner',
       // username: 'iambrock',
        password: 'mission@009',
        address : 'somewhere'
      })
    expect(res.status).toBe(400)
  })

  // GET USER
  it('should get back an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    res = await request(app).get(`/api/v1/users/${userId}`)

    expect(res.body._id).toEqual(userId)
  })

  // GET USER - WRONG ID
  it('should not get back a non-existing user', async () => {
    const res = await request(app).get(`/api/v1/users/${nonExistingUserId}`)
    expect(res.status).toBe(404)
  })

  // GET ALL USERS
  it('should get back all users', async () => {
    const res1 = await createUser({
      email: 'brock@gmail.com',
      firstName: 'brock',
      lastName: 'lesner',
      username: 'iambrock',
    })
    const res2 = await createUser({
      email: 'TripleH@gmail.com',
      firstName: 'Triple',
      lastName: 'H',
      username: 'TripleH',
    })

    const res3 = await request(app).get('/api/v1/users')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

   // PUT - UPDATE USER
   it('should update an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)

    const userId = res.body._id
    const update = {
      firstName: 'John2',
      lastName: 'Cena2',
      email: 'John2@gmail.com',
      username: 'iamJohn2',
    }

    res = await request(app).put(`/api/v1/users/${userId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.firstName).toEqual('John2')
    expect(res.body.username).toEqual('iamJohn2')
  })

  // DELETE USER
  it('should delete an existing user', async () => {
    let res = await createUser()
    expect(res.status).toBe(200)
    const userId = res.body._id

    res = await request(app).delete(`/api/v1/users/${userId}`)
    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/users/${userId}`)
    expect(res.status).toBe(404)
  })

})
