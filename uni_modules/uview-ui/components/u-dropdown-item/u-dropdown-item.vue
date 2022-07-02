<template>
	<view class="u-dropdown-item" v-if="active" @touchmove.stop.prevent="() => {}" @tap.stop.prevent="() => {}">
		<block v-if="!$slots.default && !$slots.$default">
			<scroll-view scroll-y="true" :style="{
					height: $u.addUnit(height)
				}">
				<view class="u-dropdown-item__options">
					<u-cell-group>
						<u-cell @click="cellClick(item.value)" :arrow="false" :title="item.label"
							v-for="(item, index) in options" :key="index" :title-style="{
								color: value == item.value ? activeColor : inactiveColor
							}">
							<u-icon slot="right-icon" v-if="value == item.value" name="checkbox-mark"
								:color="activeColor" size="32rpx">
							</u-icon>
						</u-cell>
					</u-cell-group>
				</view>
			</scroll-view>
		</block>
		<slot v-else />
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	const dom = uni.requireNativePlugin('dom')
	// #endif
	import props from './props.js';
	/**
	 * Drawdownitem
	 * @description 
	 * @tutorial url
	 * @property {String | Number} v-model 双向绑定选项卡选择值 1.0
	 * @property {String} title 菜单项标题 1.0
	 * @property {Array[Object]} options 选项数据，如果传入了默认slot，此参数无效 1.0
	 * @property {Boolean} disabled 是否禁用此选项卡（默认false） 1.0
	 * @property {String | Number} duration 选项卡展开和收起的过渡时间，单位ms（默认300） 1.0
	 * @property {String | Number} height 弹窗下拉内容的高度(内容超出将会滚动)（默认auto） 1.0
	 * @example <u-dropdown-item title="标题"></u-dropdown-item>
	 */
	export default {
		name: 'u-drawdown-item',
		mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
		data() {
			return {
				show: false,
				active: false, // 当前项是否处于展开状态 1.0
				activeColor: '#2979ff', // 激活时左边文字和右边对勾图标的颜色 1.0
				inactiveColor: '#606266', // 未激活时左边文字和右边对勾图标的颜色 1.0
				// uni.createAnimation的导出数据
				animationData: {},
			}
		},
		mounted() {
			this.init()
		},
		//2.0
		created() {
			// 父组件的实例
			this.parent = false;
		},
		watch: {
			//1.0
			propsChange(n) {
				// 当值变化时，通知父组件重新初始化，让父组件执行每个子组件的init()方法
				// 将所有子组件数据重新整理一遍
				if (this.parent) this.parent.init();
			},
			// 发生变化时，需要去更新父组件对应的值
			dataChange(newValue, oldValue) {
				this.updateParentData()
			}
		},
		computed: {
			// 监听props是否发生了变化，有些值需要传递给父组件u-dropdown，无法双向绑定 1.0
			propsChange() {
				return `${this.title}-${this.disabled}`;
			},
			// 监听对应变量的变化
			dataChange() {
				return [this.title, this.disabled]
			},
			style() {
				const style = {
					zIndex: 10071,
					position: 'fixed',
					display: 'flex',
					left: 0,
					right: 0
				}
				style.top = uni.$u.addUnit(this.top)
				return style
			}
		},
		methods: {
			// cell被点击 1.0
			cellClick(value) {
				this.value = value;
				// 修改通过v-model绑定的值
				this.$emit('input', value);
				// 通知父组件(u-dropdown)收起菜单
				this.parent.close();
				// 发出事件，抛出当前勾选项的value
				this.$emit('change', value);
			},
			init() {
				this.updateParentData()
			},
			// 更新父组件所需的数据
			updateParentData() {
				// 获取父组件u-dropdown
				this.getParentData('u-dropdown')
				if (!this.parent) uni.$u.error('u-dropdown-item必须配合u-dropdown使用')


				this.activeColor = parent.activeColor;
				this.inactiveColor = parent.inactiveColor;

				// 查找父组件menuList数组中对应的标题数据
				const menuIndex = this.parent.menuList.findIndex(item => item.title === this.title)
				const menuContent = {
					title: this.title,
					disabled: this.disabled
				}
				if (menuIndex >= 0) {
					// 如果能找到，则直接修改
					this.parent.menuList[menuIndex] = menuContent;
				} else {
					// 如果无法找到，则为第一次添加，直接push即可
					this.parent.menuList.push(menuContent);
				}
			},
			async setContentAnimate(height) {
				this.animating = true
				// #ifdef APP-NVUE
				const ref = this.$refs['animation'].ref
				animation.transition(ref, {
					styles: {
						height: uni.$u.addUnit(height)
					},
					duration: this.duration,
					timingFunction: 'ease-in-out',
				}, () => {
					this.animating = false
				})
				// #endif

				// #ifndef APP-NVUE
				const animation = uni.createAnimation({
					timingFunction: 'ease-in-out',
				});
				animation
					.height(height)
					.step({
						duration: this.duration,
					})
					.step()
				// 导出动画数据给面板的animationData值
				this.animationData = animation.export()
				// 标识动画结束
				uni.$u.sleep(this.duration).then(() => {
					this.animating = false
				})
				// #endif
			},
			overlayClick() {
				this.show = false
				this.setContentAnimate(0)
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '../../libs/css/components.scss';

	.u-drawdown-item {

		&__content {
			background-color: #FFFFFF;
			overflow: hidden;
			height: 0;
		}
	}
</style>
