import Request from './../luch-request'

/**
 * 创建luch-reqeust请求实例
 * @param {object} config - 全局请求配置
 * @return 返回luch-request 新的实例
 */
export function createRequest (config = {}) {
	return new Request(config)
}