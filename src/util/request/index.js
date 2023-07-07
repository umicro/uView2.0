// 引入配置
import requestInterceptors from './requestInterceptors';
import responseInterceptors from './responseInterceptors';
import config from '@/common/config'
// 初始化请求配置
uni.$u.http.setConfig((defaultConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = config.baseUrl /* 根域名 */
    return defaultConfig
})

export default (vm) => {
    requestInterceptors(vm);
    responseInterceptors(vm);
};
