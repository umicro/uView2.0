export default (err) => {
	// 开发期间才报错
	if(process.env.NODE_ENV === 'development') {
		throw new Error(err)
	}
}