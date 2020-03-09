import qs from "qs"

const api = '//localhost:8088'

export default {
  request(url = '', method = '', body = undefined) {
    method = method.toUpperCase()
    if (method == "GET" && body == undefined) {
      url = url + `?${qs.stringify(body)}`
    }
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  },
  get(url, body) {
    return this.request(url, 'GET', body)
  },
  post(url, body){
    return this.request(url, 'POST', body)
  },
  signIn(body){
    return this.post(`${api}/v1/api/post/user/login`,body)
  }
}