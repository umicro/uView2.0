/*
 * @Author       : LQ
 * @Description  : 
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:45
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
 */
export default {
	// search
	search:{
		shape:  'round',
		bgColor:  '#f2f2f2',
		placeholder:  '请输入关键字',
		clearabled:  true,
		focus:  false,
		showAction:  true,
		actionStyle: ()=> {
				return {};
			},
		actionText: '搜索',
		inputAlign:  'left',
		disabled:  false,
		animation:  false,
		borderColor:  'transparent',
		value:  '',
		height:  64,
		inputStyle:  ()=> {
				return {}
			},
		maxlength:  '-1',
		searchIconColor:  '#909399',
		color:  '#606266',
		placeholderColor:  '#909399',
		margin:  '0',
		searchIcon:  'search',
		label: null
	},
}