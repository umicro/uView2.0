<template>
	<view class="u-table">
		
	</view>
</template>

<script>
	import props from './props.js';
	/**
	 * Table 表格 
	 * @description 表格组件一般用于展示大量结构化数据的场景 本组件标签类似HTML的table表格，由table、tr、th、td四个组件组成
	 * @tutorial https://www.uviewui.com/components/table.html
	 * @property {String}			border-color	表格边框的颜色
	 * @property {String}			bg-color		表格的背景颜色
	 * @property {String}			align			单元格的内容对齐方式，作用类似css的text-align
	 * @property {String}			padding			单元格的内边距，同css的padding写法
	 * @property {String | Number}	font-size		单元格字体大小，单位px
	 * @property {String}			color			单元格字体颜色
	 * @property {Object}			th-style		th单元格的样式，对象形式(将th所需参数放在table组件，是为了避免每一个th组件要写一遍)
	 * @example <u-table><u-tr><u-th>学校</u-th </u-tr> <u-tr><u-td>浙江大学</u-td> </u-tr> <u-tr><u-td>清华大学</u-td> </u-tr></u-table>
	 */
	export default {
		name: 'u-table',
		mixins: [uni.$u.mixin,props],
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
</style>
