/**
 * 使用bindingx方案实现slider
 * 只能使用于nvue下
 */
// 引入bindingx，此库类似于微信小程序wxs，目的是让js运行在视图层，减少视图层和逻辑层的通信折损
const BindingX = uni.requireNativePlugin('bindingx')
// nvue操作dom的库，用于获取dom的尺寸信息
const dom = uni.requireNativePlugin('dom')
// nvue中用于操作元素动画的库，类似于uni.animation，只不过uni.animation不能用于nvue
const animation = uni.requireNativePlugin('animation')

export default {
	data() {
		return {
			// bindingx的回调值，用于取消绑定
			panEvent: null,
			// 标记是否移动状态
			moving: false,
			// 位移的偏移量
			x: 0
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
			this.getSliderRect()
		},
		// 获取节点信息
		// 获取slider尺寸
		getSliderRect() {
			// 获取滑块条的尺寸信息
			// 通过nvue的dom模块，查询节点信息
			setTimeout(() => {
				dom.getComponentRect(this.$refs['slider'], res => {
					this.sliderRect = res.size
				})
			}, 10)
		},
		onTouchStart() {
			if (this.moving || this.disabled) {
				return
			}
			this.moving = true
			const button = this.$refs['nvue-button'].ref
			const gap = this.$refs['nvue-gap'].ref

			const {
				min,
				max,
				step
			} = this
			const {
				left,
				width
			} = this.sliderRect
			
			// 初始值为本次偏移量x，加上次停止滑动时的结束值
			let exporession = `(${this.x} + x)`
			// 将偏移的x值，转为总位移的百分比值，为了和min和max进行判断
			exporession = `(${exporession} / ${width}) * 100`
			if (step > 1) {
				// 如果step步进大于1，需要跳步，所以需要使用Math.round进行取整
				exporession=`round(max(${min}, min(${exporession}, ${max})) / ${step}) * ${step}`
			} else {
				// 当step=1时，无需跳步，充分利用bindingx性能，滑块实时跟随手势，达到丝滑的效果
				exporession = `max(${min}, min(${exporession}, ${max}))`
			}
			// 将百分比最后转化为对应的px值
			exporession = `${exporession} / 100 * ${width}`
			
			this.panEvent = BindingX.bind({
				anchor: button,
				eventType: 'pan',
				props: [{
					element: gap,
					// 绑定width属性，设置其宽度值
					property: 'width',
					expression: exporession
				}]
			}, (e) => {
				if (e.state === 'end') {
					this.x = e.deltaX + this.x
					// 取消bindingx的方法绑定，释放资源
					BindingX.unbind({
						token: this.panEvent.token,
						// pan为手势事件
						eventType: 'pan'
					})
					this.moving = false
				}
			})
		}
	}
}
