/**
 * 请求拦截
 * @param {Object} http 
 */
module.exports = (http, vm) => {
    http.interceptors.request.use((config) => { // 可使用async await 做异步操作
        // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
        config.data = config.data || {}
		console.log('vm', vm.name2);
        return config 
    }, config => { // 可使用async await 做异步操作
        return Promise.reject(config)
    })
}