export function isCredentialsNeedsRefresh(credentials) {
  return !credentials || credentials.needsRefresh();
}

export default async function getCredentials(credentials, clearCache = false) {
  try {
    return asyncGetCredentials(clearCache);
  } catch (e) {
    console.log("getCredentials: Error", e.statusCode, e.code, e.message);
    if (e.statusCode === 400 && !clearCache) {
      console.log("getCredentials: clear cache id & try again");
      return getCredentials(credentials, true);
    }
    console.log(e);
  }
  // Throw error if credentials can't be retrieves
}

async function asyncGetCredentials(clearCache = false) {
  let AWS = await import("aws-sdk/global");

  return new Promise((resolve, reject) => {
    // !! Don't put an empty object for "Logins" -> the prop is test is exist not empty
    // -> if "Logins" = {} -> cognitoIdentityCredentials can't load from cache
    const cognitoIdentityConf = {
      IdentityPoolId: process.env.IDENTITY_POOL_ID
    };
    // if (session)
    //   cognitoIdentityConf.Logins[USER_POOL_ID] = session.getIdToken().getJwtToken()

    // Allways create a new object => Make the store triggers changes
    let cognitoIdentityCredentials = new AWS.CognitoIdentityCredentials(
      cognitoIdentityConf,
      { region: "eu-west-1" }
    );

    // Clear the AWSCognito identity id
    if (clearCache) cognitoIdentityCredentials.clearCachedId();

    cognitoIdentityCredentials.get(err => {
      if (err) {
        reject(err);
        return;
      }
      /* .get mutate credentials object
       * .get is able to refresh if credentials are expired
       * see: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Credentials.html#get-property
       */
      resolve(cognitoIdentityCredentials);
    });
  });
}
