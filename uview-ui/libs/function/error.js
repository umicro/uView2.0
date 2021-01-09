export default (err) => {
	// 开发期间才提示，正式版不会提示
	if(process.env.NODE_ENV === 'development') {
		console.error('uView提示：' + err + '。【此消息仅出现在开发环境】')
	}
}