/**
 * 进行延时，以达到可以简写代码的目的
 */
export default (value = 30) => {
	let timer = null
	return new Promise(resolve => {
		clearTimeout(timer)
		timer = null
		timer = setTimeout(() => {
			resolve()
		}, value)
	})
}