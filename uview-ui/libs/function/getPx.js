/**
 * 用于获取用户传递值的px值
 * 如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 */

import test from './test.js'

export function getPx(value) {
	if(test.number(value)) {
		return value
	}
	// 如果带有rpx，先取出其数值部分，再转为px值
	if(/rpx$/.test(value)) {
		return uni.upx2px(parseInt(value))
	} else {
		return parseInt(value)
	}
}


