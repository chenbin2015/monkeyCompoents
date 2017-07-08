import isomorphicFetch from 'isomorphic-fetch'

/**
 * 封装fetch方法，增加timeout超时，默认为5000ms
 *
 * 自定义方式
 * fetch('/getUserInfo', {
 *   timeout: 2000
 * })
 */
export default function fetch(url, {timeout = 8000, ...options} = {}) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`Fetch timeout[${timeout}ms][${url}]`))
    }, timeout)
    isomorphicFetch(url, options).then(
      (res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      }
    )
  })
}
