/**
 * 使用bindingx方案实现slider
 * 只能使用于nvue下
 */
// 引入bindingx，此库类似于微信小程序wxs，目的是让js运行在视图层，减少视图层和逻辑层的通信折损
const BindingX = uni.requireNativePlugin('bindingx')
// nvue中用于操作元素动画的库，类似于uni.animation，只不过uni.animation不能用于nvue
const animation = uni.requireNativePlugin('animation')

export default {
	methods: {
		// 点击tabs item
		tabsItemClickHandler(index) {
			animation.transition(this.$refs['u-tabs__wrapper__nav__line'].ref, {
				styles: {
					transform: `translateX(${uni.$u.addUnit(this.lineOffsetLeft)}px)`
				},
				duration: 300,
			}, (res) => {
				console.log(res);
			})
		},
		// nvueTransition
		nvueTransition(e) {
			const anchor = this.$refs['swiper'].ref
			const element = this.$refs['u-tabs__wrapper__nav__line'].ref
			const expression = 'x'
			
			BindingX.bind({
				anchor,
				eventType: 'pan',
				props: [{
					element,
					property: 'transform.translateX',
					expression
				}]
			})
		}
	}
}
