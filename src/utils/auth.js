import Cookies from 'js-cookie'

const TokenKey = 'hrsass_token'
const timeStamp = 'hrsass_time_stamp'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTimeStamp() {
  return Cookies.get(timeStamp)
}

export function setTimeStamp() {
  Cookies.set(timeStamp, Date.now())
}
