<template>
	<u-popup
	    :show="show"
	    mode="bottom"
	    @close="close"
	    :closeOnClickOverly="closeOnClickOverly"
	    :safeAreaInsetBottom="safeAreaInsetBottom"
	>
		<view class="u-action-sheet">
			<view
			    class="u-action-sheet__header"
			    v-if="title"
			>
				<text class="u-action-sheet__header__title u-line-1">{{title}}</text>
				<view
				    class="u-action-sheet__header__icon-wrap"
				    @tap.stop="close"
				>
					<u-icon
					    name="close"
					    size="14"
					    color="#c8c9cc"
					></u-icon>
				</view>
			</view>
			<text
			    class="u-action-sheet__description"
			    v-if="description"
			>{{description}}</text>
			<u-line v-if="title || description"></u-line>
			<view class="u-action-sheet__item-wrap">
				<template v-for="(item, index) in actions">
					<!-- #ifdef MP -->
					<button
					    :key="index"
					    class="u-reset-button"
					    :data-index="index"
					    :openType="openType"
					    @getuserinfo="onGetUserInfo"
					    @contact="onContact"
					    @getphonenumber="onGetPhoneNumber"
					    @error="onError"
					    @launchapp="onLaunchApp"
					    @opensetting="onOpenSetting"
					    :lang="lang"
					    :session-from="sessionFrom"
					    :send-message-title="sendMessageTitle"
					    :send-message-path="sendMessagePath"
					    :send-message-img="sendMessageImg"
					    :show-message-card="showMessageCard"
					    :app-parameter="appParameter"
					    @tap="selectHandler(index)"
					    :hover-class="!item.disabled && !item.loading ? 'u-action-sheet--hover' : ''"
					>
						<!-- #endif -->
						<view
						    class="u-action-sheet__item-wrap__item"
						    @tap.stop="selectHandler(index)"
						    :hover-class="!item.disabled && !item.loading ? 'u-action-sheet--hover' : ''"
						    :hover-stay-time="150"
						>
							<template v-if="!item.loading">
								<text
								    class="u-action-sheet__item-wrap__item__name"
								    :style="[itemStyle(index)]"
								>{{ item.name }}</text>
								<text
								    v-if="item.subname"
								    class="u-action-sheet__item-wrap__item__subname"
								>{{ item.subname }}</text>
							</template>
							<u-loading-icon
							    v-else
							    custom-class="van-action-sheet__loading"
							    size="18"
							/>
						</view>
						<!-- #ifdef MP -->
					</button>
					<!-- #endif -->
					<u-line v-if="index !== actions.length - 1"></u-line>
				</template>
			</view>
			<u-gap
			    bgColor="rgb(234, 234, 236)"
			    height="6"
			></u-gap>
			<view hover-class="u-action-sheet--hover">
				<text
				    @touchmove.stop.prevent
				    :hover-stay-time="150"
				    v-if="cancelText"
				    class="u-action-sheet__cancel-text"
				    @tap="close"
				>{{cancelText}}</text>
			</view>
		</view>
	</u-popup>
</template>

<script>
	import openType from '../../libs/mixin/open-type'
	import button from '../../libs/mixin/button'
	/**
	 * actionSheet 操作菜单
	 * @description 本组件用于从底部弹出一个操作菜单，供用户选择并返回结果。本组件功能类似于uni的uni.showActionSheetAPI，配置更加灵活，所有平台都表现一致。
	 * @tutorial https://www.uviewui.com/components/actionSheet.html
	 * @property {Array<Object>} actions 按钮的文字数组，见官方文档示例
	 * @property {Boolean} show 是否展示操作菜单
	 * @property {Object} tips 顶部的提示文字，见官方文档示例
	 * @property {String} cancel-text 取消按钮的提示文字
	 * @property {Boolean} cancel-btn 是否显示底部的取消按钮（默认true）
	 * @property {Number String} border-radius 弹出部分顶部左右的圆角值，单位rpx（默认0）
	 * @property {Boolean} mask-close-able 点击遮罩是否可以关闭（默认true）
	 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
	 * @property {Number String} z-index z-index值（默认1075）
	 * @property {String} cancel-text 取消按钮的提示文字
	 * @property {Object} customStyle 自定义样式，对象类型
	 * @event {Function} click 点击ActionSheet列表项时触发
	 * @event {Function} close 点击取消按钮时触发
	 * @example <u-action-sheet :actions="actions" @click="click" :show="show"></u-action-sheet>
	 */
	export default {
		name: "u-action-sheet",
		props: {
			// 是否展示
			show: {
				type: Boolean,
				default: uni.$u.props.actionSheet.show
			},
			// 标题
			title: {
				type: String,
				default: uni.$u.props.actionSheet.title
			},
			// 选项上方的描述信息
			description: {
				type: String,
				default: uni.$u.props.actionSheet.description
			},
			// 数据
			actions: {
				type: Array,
				default: uni.$u.props.actionSheet.actions
			},
			// 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.index获取
			index: {
				type: String,
				default: uni.$u.props.actionSheet.index
			},
			// 取消按钮的文字，不为空时显示按钮
			cancelText: {
				type: String,
				default: uni.$u.props.actionSheet.cancelText
			},
			// 点击某个菜单项时是否关闭弹窗
			closeOnClickAction: {
				type: Boolean,
				default: uni.$u.props.actionSheet.closeOnClickAction
			},
			// 处理底部安全区
			safeAreaInsetBottom: {
				type: Boolean,
				default: uni.$u.props.actionSheet.safeAreaInsetBottom
			},
			// 小程序的打开方式
			openType: {
				type: String,
				default: uni.$u.props.actionSheet.openType
			},
			// 点击遮罩是否允许关闭
			closeOnClickOverly: {
				type: Boolean,
				default: uni.$u.props.actionSheet.closeOnClickOverly
			}
		},
		// 一些props参数和methods方法，通过mixin混入，因为其他文件也会用到
		mixins: [openType, button, uni.$u.mixin],
		data() {
			return {

			}
		},
		computed: {
			// 操作项目的样式
			itemStyle() {
				return (index) => {
					let style = {};
					if (this.actions[index].color) style.color = this.actions[index].color
					if (this.actions[index].fontSize) style.fontSize = uni.$u.addUnit(this.actions[index].fontSize)
					// 选项被禁用的样式
					if (this.actions[index].disabled) style.color = '#c0c4cc'
					return style;
				}
			},
		},
		methods: {
			close() {
				this.$emit('close')
			},
			selectHandler(index) {
				const item = this.actions[index]
				if (item && !item.disabled && !item.loading) {
					this.$emit('select', item)
					if (this.closeOnClickAction) {
						this.close()
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	$u-action-sheet-reset-button-width:100% !default;
	$u-action-sheet-title-font-size: 16px !default;
	$u-action-sheet-title-padding: 18px 30px !default;
	$u-action-sheet-title-color: $u-main-color !default;
	$u-action-sheet-header-icon-wrap-right:15px !default;
	$u-action-sheet-header-icon-wrap-top:15px !default;
	$u-action-sheet-description-font-size:14px !default;
	$u-action-sheet-description-color:14px !default;
	$u-action-sheet-description-margin: 18px 15px !default;
	$u-action-sheet-item-wrap-item-padding:15px !default;
	$u-action-sheet-item-wrap-name-font-size:16px !default;
	$u-action-sheet-item-wrap-subname-font-size:13px !default;
	$u-action-sheet-item-wrap-subname-color: #c0c4cc !default;
	$u-action-sheet-item-wrap-subname-margin-top:10px !default;
	$u-action-sheet-cancel-text-font-size:16px !default;
	$u-action-sheet-cancel-text-color:$u-main-color !default;
	$u-action-sheet-cancel-text-font-size:15px!default;
	$u-action-sheet-cancel-text-hover-background-color:rgb(242, 243, 245)!default;
	.u-reset-button {
		width: $u-action-sheet-reset-button-width;
	}

	.u-action-sheet {

		&__header {
			position: relative;

			&__title {
				font-size: $u-action-sheet-title-font-size;
				color: $u-action-sheet-title-color;
				padding: $u-action-sheet-title-padding;
				text-align: center;
				font-weight: bold;
			}

			&__icon-wrap {
				position: absolute;
				right: $u-action-sheet-header-icon-wrap-right;
				top: $u-action-sheet-header-icon-wrap-top;
			}
		}

		&__description {
			font-size: $u-action-sheet-description-font-size;
			color: $u-tips-color;
			margin: $u-action-sheet-description-margin;
			text-align: center;
		}

		&__item-wrap {

			&__item {
				padding: $u-action-sheet-item-wrap-item-padding;
				@include flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				&__name {
					font-size: $u-action-sheet-item-wrap-name-font-size;
					color: $u-main-color;
					text-align: center;
				}

				&__subname {
					font-size: $u-action-sheet-item-wrap-subname-font-size;
					color:$u-action-sheet-item-wrap-subname-color;
					margin-top: $u-action-sheet-item-wrap-subname-margin-top;
					text-align: center;
				}
			}
		}

		&__cancel-text {
			font-size:$u-action-sheet-cancel-text-font-size;
			color:$u-action-sheet-cancel-text-color;
			text-align: center;
			padding:$u-action-sheet-cancel-text-font-size;
		}

		&--hover {
			background-color:$u-action-sheet-cancel-text-hover-background-color;
		}
	}
</style>
