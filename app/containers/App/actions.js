
import {
  INIT_CREDENTIALS,
  REQUEST_API
} from './constants'

export function initCredentials () {
  return {
    type: INIT_CREDENTIALS
  }
}

export function requestAPI (action, credentials, data) {
  return {
    type: REQUEST_API,
    action,
    credentials,
    data
  }
}
