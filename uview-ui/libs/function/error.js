export default (err) => {
	// 开发环境才提示，生产环境不会提示
	if(process.env.NODE_ENV === 'development') {
		console.error('uView提示：' + err)
	}
}