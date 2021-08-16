<template>
	<view
	    class="u-tabbar-item"
	    :style="[$u.addStyle(customStyle)]"
	    @tap="clickHandler"
	>
		<u-badge
		    :customStyle="badgeStyle"
		    :isDot="dot"
		    :value="badge || (dot ? 1 : null)"
		    :show="dot || badge > 0"
		>
			<view class="u-tabbar-item__icon">
				<u-icon
				    v-if="icon"
				    :name="icon"
				    :color="isActive? parentData.activeColor : parentData.inactiveColor"
				    :size="20"
				></u-icon>
				<template v-else>
					<slot
					    v-if="isActive"
					    name="active-icon"
					/>
					<slot
					    v-else
					    name="inactive-icon"
					/>
				</template>
			</view>
		</u-badge>
		<slot name="text">
			<text
			    class="u-tabbar-item__text"
			    :style="{
					color: isActive? parentData.activeColor : parentData.inactiveColor
				}"
			>{{ text }}</text>
		</slot>
	</view>
</template>

<script>
	import props from './props.js';
	export default {
		name: 'u-tabbar-item',
		mixins: [uni.$u.mixin,props],
		
		data() {
			return {
				isActive: false, // 是否处于激活状态
				parentData: {
					value: null,
					activeColor: '',
					inactiveColor: ''
				}
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				// 支付宝小程序不支持provide/inject，所以使用这个方法获取整个父组件，在created定义，避免循环引用
				this.updateParentData()
				if (!this.parent) {
					uni.$u.error('u-tabbar-item必须搭配u-tabbar组件使用')
				}
				// 本子组件在u-tabbar的children数组中的索引
				const index = this.parent.children.indexOf(this)
				// 判断本组件的name(如果没有定义name，就用index索引)是否等于父组件的value参数
				this.isActive = (this.name || index) === this.parentData.value
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('u-tabbar')
			},
			// 此方法将会被父组件u-tabbar调用
			updateFromParent() {
				// 重新初始化
				this.init()
			},
			clickHandler() {
				this.$nextTick(() => {
					const index = this.parent.children.indexOf(this)
					const name = this.name || index
					// 点击的item为非激活的item才发出change事件
					if (name !== this.parent.value) {
						this.parent.$emit('change', name)
					}
					this.$emit('click', name)
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tabbar-item {
		@include flex(column);
		align-items: center;
		justify-content: center;
		flex: 1;

		&__text {
			margin-top: 2px;
			font-size: 12px;
			color: $u-content-color;
		}
	}

	/* #ifdef MP */
	// 由于小程序都使用shadow DOM形式实现，需要给影子宿主设置flex: 1才能让其撑开
	:host {
		flex: 1
	}
	/* #endif */
</style>
