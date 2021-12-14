export default {
	name: [
		{ required: true, message: '请输入规则名称', trigger: 'blur' },
	],
	code: [
		{
			asyncValidator: (rule, value, callback) => {
				setTimeout(() => {
					if (value == '1234') {
						return callback();
					} else {
						return callback(new Error('验证码错误'));
					}

				}, 1000);
			}
		}
	]
}