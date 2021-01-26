/**
 * 进行延时，以达到可以简写代码的目的，比如
 * await uni.$u.sleep(20)将会阻塞20ms
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