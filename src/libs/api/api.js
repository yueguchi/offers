import { Auth, API } from 'aws-amplify'

const API_NAME = 'cognito-tutorial-api'

export async function putUser(email, sub) {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  const params = {
    email: email,
    sub: sub
  }
  return API.post(API_NAME, '/stg/api/v1/users', {
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    }
  })
}

export async function getUsers() {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  console.log(token)
  return API.get(API_NAME, '/stg/api/v1/users', {
    headers: {
      Authorization: token
    }
  })
}
