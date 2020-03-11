import qs from "qs"

const api = 'http://10.64.32.152:8088'

export default {
  request(url = '', method = '', body = undefined) {
    method = method.toUpperCase()
    if (method == "GET" && body == undefined) {
      url = url + `?${qs.stringify(body)}`
    }
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    if (window.token != undefined) {
      headers.token == window.token
    }
    return fetch(url, {
      method: method,
      headers: headers,
      body: qs.stringify(body),
    }).then((res) => {
      return res.json();
    })
  },
  get(url, body) {
    return this.request(url, 'GET', body)
  },
  post(url, body) {
    return this.request(url, 'POST', body)
  },
  signIn(body) {
    return this.post(`${api}/v1/api/post/user/login`, body)
  },
  signUp(body) {
    return this.post(`${api}/v1/api/post/user/sign-up`, body)
  },
}