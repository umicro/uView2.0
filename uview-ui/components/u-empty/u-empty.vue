<template>
	<view
	    class="u-empty"
	    :style="[emptyStyle]"
	    v-if="show"
	>
		<u-icon
		    v-if="!isSrc"
		    :name="'empty-' + mode"
		    :size="iconSize"
		    :color="iconColor"
		    margin-top="14"
		></u-icon>
		<image
		    v-else
			:style="{
				width: $u.addUnit(width),
				height: $u.addUnit(height),
			}"
		    :src="icon"
		    mode="widthFix"
		></image>
		<text
		    class="u-empty__text"
		    :style="[textStyle]"
		>{{text ? text : icons[mode]}}</text>
	</view>
</template>

<script>
	export default {
		name: "u-empty",
		props: {
			// 内置图标名称，或图片路径，建议绝对路径
			icon: {
				type: String,
				default: uni.$u.props.empty.icon
			},
			// 提示文字
			text: {
				type: String,
				default: uni.$u.props.empty.text
			},
			// 文字颜色
			textColor: {
				type: String,
				default: uni.$u.props.empty.textColor
			},
			// 文字大小
			textSize: {
				type: [String, Number],
				default: uni.$u.props.empty.textSize
			},
			// 图标的颜色
			iconColor: {
				type: String,
				default: uni.$u.props.empty.iconColor
			},
			// 图标的大小
			iconSize: {
				type: [String, Number],
				default: uni.$u.props.empty.iconSize
			},
			// 选择预置的图标类型
			mode: {
				type: String,
				default: uni.$u.props.empty.mode
			},
			//  图标宽度，单位px
			width: {
				type: [String, Number],
				default: uni.$u.props.empty.width
			},
			// 图标高度，单位px
			height: {
				type: [String, Number],
				default: uni.$u.props.empty.height
			},
			// 是否显示组件
			show: {
				type: Boolean,
				default: uni.$u.props.empty.show
			},
			// 组件距离上一个元素之间的距离，默认px单位
			marginTop: {
				type: [String, Number],
				default: uni.$u.props.empty.marginTop
			}
		},
		mixins: [uni.$u.mixin],
		data() {
			return {
				icons: {
					car: '购物车为空',
					page: '页面不存在',
					search: '没有搜索结果',
					address: '没有收货地址',
					wifi: '没有WiFi',
					order: '订单为空',
					coupon: '没有优惠券',
					favor: '暂无收藏',
					permission: '无权限',
					history: '无历史记录',
					news: '无新闻列表',
					message: '消息列表为空',
					list: '列表为空',
					data: '数据为空',
					comment: '暂无评论',
				},
				// icons: [{
				// 	icon: 'car',
				// 	text: '购物车为空'
				// },{
				// 	icon: 'page',
				// 	text: '页面不存在'
				// },{
				// 	icon: 'search',
				// 	text: '没有搜索结果'
				// },{
				// 	icon: 'address',
				// 	text: '没有收货地址'
				// },{
				// 	icon: 'wifi',
				// 	text: '没有WiFi'
				// },{
				// 	icon: 'order',
				// 	text: '订单为空'
				// },{
				// 	icon: 'coupon',
				// 	text: '没有优惠券'
				// },{
				// 	icon: 'favor',
				// 	text: '暂无收藏'
				// },{
				// 	icon: 'permission',
				// 	text: '无权限'
				// },{
				// 	icon: 'history',
				// 	text: '无历史记录'
				// },{
				// 	icon: 'news',
				// 	text: '无新闻列表'
				// },{
				// 	icon: 'message',
				// 	text: '消息列表为空'
				// },{
				// 	icon: 'list',
				// 	text: '列表为空'
				// },{
				// 	icon: 'data',
				// 	text: '数据为空'
				// }],

			}
		},
		computed: {
			// 组件样式
			emptyStyle() {
				const style = {}
				style.marginTop = uni.$u.addUnit(this.marginTop)
				// 合并customStyle样式，此参数通过mixin中的props传递
				return uni.$u.deepMerge(this.customStyle, style)
			},
			// 文本样式
			textStyle() {
				const style = {}
				style.color = this.textColor
				style.fontSize = uni.$u.addUnit(this.textSize)
				return style
			},
			// 判断icon是否图片路径
			isSrc() {
				return this.icon.indexOf('/') >= 0
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';

	.u-empty {
		@include flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&__text {
			@include flex;
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
		}
	}
</style>
