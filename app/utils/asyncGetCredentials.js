import {
  IDENTITY_POOL_ID,
  USER_POOL_ID
} from 'config'

export default function asyncGetCredentials (session) {
  return new Promise((resolve, reject) => {
    let cognitoIdentityConf = {
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: {}
    }

    if (session)
      cognitoIdentityConf.Logins[USER_POOL_ID] = session.getIdToken().getJwtToken()

    let cognitoIdentityCredentials = new AWS.CognitoIdentityCredentials(cognitoIdentityConf, { region: 'eu-west-1' })
// besoin de faire le .get ????
    cognitoIdentityCredentials.get((err) => {
      if (err) {
        reject(err)
        return
      }
      /* .get mutate credentials object
       * .get is able to refresh if credentials are expired
       * see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html#get-property
       */
      resolve(cognitoIdentityCredentials)
    })
  })
}
