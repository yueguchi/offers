import { Auth, API } from 'aws-amplify'

const API_NAME = 'cognito-tutorial-api'

export async function getTest() {
  const user = await Auth.currentAuthenticatedUser()
  const token = user.signInUserSession.idToken.jwtToken
  console.log(token)
  return API.get(API_NAME, '/stg/api/v1/users', {
    headers: {
      Authorization: token
    }
  })
}
