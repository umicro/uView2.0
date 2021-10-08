// 获取菜单
export const fetchMenu = (params, config = {}) => uni.$u.http.post('/ebapi/public_api/index', params, config)
