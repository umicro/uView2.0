import md5 from './md5.min.js'

const throttleStore = {}

const generateThrottle = (hash = '') => {
  let pendding = false
  const argsRef = {}
  return (func = () => {}, wait = 500, immediate = true, ...args) => {

    if (!pendding) {
      pendding = true
      if (immediate) {
        func?.(...args)
        setTimeout(() => {
          pendding = false
          delete throttleStore[hash]
          console.log(throttleStore)
        }, wait)
      } else {
        setTimeout(() => {
            func?.(...args)
            pendding = false
            delete throttleStore[hash]
        }, wait)
      }
    }
  }
}

export default function throttle (...args) {
  const { stack } = new Error('generate throttle error')
  const hash = md5(stack)
  const throttleCb = throttleStore[hash]

  if (throttleCb) {
    throttleCb()
    return
  }

  const cb = generateThrottle(hash)

  throttleStore[hash] = cb

  cb(...args)
}