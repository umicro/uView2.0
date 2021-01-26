import trim from './trim.js'
import test from './test.js'
/**
 * 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {Object | String} 需要转换的目标
 * @param {String} 转换的目的，object-转为对象，string-转为字符串
 */
function addStyle(customStyle, target = 'object') {
	// 字符串转字符串，对象转对象情形，直接返回
	if (test.empty(customStyle) || typeof(customStyle) === 'object' && target === 'object' || target === 'string' && typeof(customStyle) === 'string') {
		return customStyle
	} else {
		// 字符串转对象
		if(target === 'object') {
			// 去除字符串样式中的所有空格，空格是无用的
			customStyle = trim(customStyle, 'all')
			// 根据";"将字符串转为数组形式
			const styleArray = customStyle.split(';')
			const style = {}
			// 历遍数组，拼接成对象
			for (let i = 0; i < styleArray.length; i++) {
				// 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
				if (styleArray[i]) {
					let item = styleArray[i].split(':')
					style[item[0]] = item[1]
				}
			}
			return style
		} else {
			// 这里为对象转字符串形式
			let string = ''
			for(let i in customStyle) {
				// 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
				let key = i.replace(/([A-Z])/g,"-$1").toLowerCase()
				string +=  `${key}:${customStyle[i]};`
			}
			// 去除两端空格
			return trim(string)
		}
	}
}

export default addStyle
