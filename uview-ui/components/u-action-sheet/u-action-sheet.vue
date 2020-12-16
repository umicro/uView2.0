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
	
	$u-action-sheet-title-font-size: 16px !default;
	$u-action-sheet-title-padding: 18px 30px !default;
	$u-action-sheet-title-color: $u-main-color !default;

	.u-reset-button {
		width: 100%;
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
				right: 15px;
				top: 15px;
			}
		}

		&__description {
			font-size: 14px;
			color: $u-tips-color;
			margin: 18px 15px;
			text-align: center;
		}

		&__item-wrap {

			&__item {
				padding: 15px;
				@include flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;

				&__name {
					font-size: 16px;
					color: $u-main-color;
					text-align: center;
				}

				&__subname {
					font-size: 13px;
					color: #c0c4cc;
					margin-top: 10px;
					text-align: center;
				}
			}
		}

		&__cancel-text {
			font-size: 16px;
			color: $u-main-color;
			text-align: center;
			padding: 15px;
		}

		&--hover {
			background-color: rgb(242, 243, 245);
		}
	}
</style>
