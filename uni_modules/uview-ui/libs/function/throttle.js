import md5 from '../util/md5.min.js'

const throttleStore = {}

const generateThrottle = (key = '') => {
  let pendding = false
  return (func = () => {}, wait = 500, immediate = true, ...args) => {

    if (!pendding) {
      pendding = true
      if (immediate) {
        func?.(...args)
        setTimeout(() => {
          pendding = false
          delete throttleStore[key]
        }, wait)
      } else {
        setTimeout(() => {
            func?.(...args)
            pendding = false
            delete throttleStore[key]
        }, wait)
      }
    }
  }
}

export function throttle(...args) {
    let key = ''
    const customKeyIndex = args.findIndex(v => typeof v === 'string' && v.includes('throttleKey:'))

    if (customKeyIndex !== -1) {
      key = args.splice(customKeyIndex, 1)[0].trim().split('throttleKey:')[1]
    } else {
      const { stack } = new Error('generate throttle error')
      key = md5(stack)
    }
  
    const throttleCb = throttleStore[key]
  
    if (throttleCb) {
      throttleCb()
      return
    }
  
    const cb = generateThrottle(key)
  
    throttleStore[key] = cb
  
    cb(...args)
  }
