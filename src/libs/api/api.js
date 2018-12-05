// https://aws-amplify.github.io/docs/js/api
import { Auth, API } from 'aws-amplify'

const API_NAME = 'cognito-tutorial-api'

async function getToken() {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  return token
}

export async function putUser(email, sub) {
  const params = {
    email: email,
    sub: sub
  }
  return API.post(API_NAME, '/stg/offers/api/v1/users', {
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: await getToken()
    }
  })
}

export async function getUsers() {
  return API.get(API_NAME, '/stg/offers/api/v1/users', {
    headers: {
      Authorization: await getToken()
    }
  })
}
