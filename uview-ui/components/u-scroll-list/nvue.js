// 引入bindingx，此库类似于微信小程序wxs，目的是让js运行在视图层，减少视图层和逻辑层的通信折损
const BindingX = uni.requireNativePlugin('bindingx')

export default {
	methods: {
		// 此处不写注释，请自行体会
		nvueScrollHandler(e) {
			const anchor = this.$refs['u-scroll-list__scroll-view'].ref
			const element = this.$refs['u-scroll-list__indicator__line__bar'].ref
			const scrollLeft = e.contentOffset.x,
				contentSize = e.contentSize.width,
				scrollWidth = this.scrollWidth,
				barAllMoveWidth = this.indicatorWidth - this.indicatorBarWidth
			const expression = `(x / 2) / ${contentSize - scrollWidth} * ${barAllMoveWidth}`
			BindingX.bind({
				anchor,
				eventType: 'scroll',
				props: [{
					element,
					property: 'transform.translateX',
					expression
				}]
			})
		}
	}
}
