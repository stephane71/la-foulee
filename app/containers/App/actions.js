
import {
  INIT_CREDENTIALS,
  UPDATE_CREDENTIALS,
  REQUEST_API
} from './constants'

export function initCredentials () {
  return {
    type: INIT_CREDENTIALS
  }
}

export function updateCredentials (credentials) {
  return {
    type: UPDATE_CREDENTIALS,
    credentials
  }
}

export function requestAPI (api, action, data) {
  return {
    type: REQUEST_API,
    api,
    action,
    data
  }
}
