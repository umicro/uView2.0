<template>
	<u-popup
	    :show="show"
	    mode="bottom"
	    @close="close"
	>
		<view class="u-action-sheet">
			<view
			    class="u-action-sheet__header"
			    v-if="title"
			>
				<text class="u-action-sheet__header__title u-line-1">{{title}}</text>
				<view class="u-action-sheet__header__icon-wrap" @tap.stop="close">
					<u-icon
					    name="close"
					    size="14"
					    color="#c8c9cc"
					></u-icon>
				</view>
			</view>
			<text class="u-action-sheet__description" v-if="description">{{description}}</text>
			<u-line v-if="title || description"></u-line>
			<view class="u-action-sheet__item-wrap">
				<!-- #ifdef MP -->
				<button
				    class="u-reset-button"
				    v-for="(item, index) in actions"
				    :key="index"
				>
					<template v-if="!item.loading">
						<text
						    class="u-action-sheet__item-wrap__item__name"
						    :style="[itemStyle(index)]"
						>{{ item.name }}</text>
						<text class="u-action-sheet__item-wrap__item__subname">{{ item.subname }}</text>
					</template>
					<u-loading
					    v-else
					    custom-class="van-action-sheet__loading"
					    size="22px"
					/>
				</button>
				<!-- #endif -->
				<!-- #ifndef MP -->
				<template v-for="(item, index) in actions">
					<view
					    class="u-action-sheet__item-wrap__item"
					    @tap.stop="selectHandler(index)"
					    :hover-class="!item.disabled && !item.loading && 'u-action-sheet--hover'"
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
					<u-line v-if="index !== actions.length - 1"></u-line>
				</template>
				<!-- #endif -->
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
	export default {
		name: "u-action-sheet",
		props: {
			// 是否展示
			show: {
				type: Boolean,
				default: false
			},
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 选项上方的描述信息
			description: {
				type: String,
				default: ''
			},
			// 数据
			actions: {
				type: Array,
				default () {
					return []
				}
			},
			// 取消按钮的文字，不为空时显示按钮
			cancelText: {
				type: String,
				default: ''
			},
			// 
			closeOnClickAction: {
				type: Boolean,
				default: true
			}
		},
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
				const item = this.actions[index];
				if (item && !item.disabled && !item.loading) {
					this.$emit('select', item);
					if (this.closeOnClickAction) {
						this.close();
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-action-sheet {

		&__header {
			position: relative;

			&__title {
				font-size: 16px;
				color: $u-main-color;
				padding: 18px 30px;
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
