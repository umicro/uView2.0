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
			x: 0,
			// 是否正在触摸过程中，用于标记动画类是否添加或移除
			touching: false
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
		// 点击slider
		onClick(e) {
			if (this.disabled || this.moving) {
				return
			}
			// 标记为移动中状态，并延时250ms，因为这里改变滑块位置，加入了动画，需要等动画结束
			this.moving = true
			setTimeout(() => {
				this.moving = false
			}, 230)
			const {
				left,
				width
			} = this.sliderRect
			const x = e.touches[0].screenX
			// 直接点击滑块的情况，计算方式与onTouchMove方法相同
			var value = ((x - left) / width) * 100
			const percent = this.formatStep(value)
			// 设置移动的值
			const barStyle = {
				width: percent / 100 * width + 'px'
			}
			// 修改value值
			this.$emit('input', percent)
			// 事件的名称
			this.emitEvent('click', percent)
			this.barStyle = barStyle
		},
		emitEvent(event, value) {
			this.$emit(event, value ? value : this.value)
		},
		formatStep(value) {
			// 移动点占总长度的百分比
			return Math.round(Math.max(this.min, Math.min(value, this.max)) / this.step) * this.step
		},
		// 滑动开始
		onTouchStart(e) {
			// 阻止页面滚动，可以保证在滑动过程中，不让页面可以上下滚动，造成不好的体验
			e.stopPropagation && e.stopPropagation() 
			e.preventDefault && e.preventDefault()
		},
		// 滑动时的事件
		onTouchMove(e) {
			if (this.moving || this.disabled) {
				return
			}
			// 阻止页面滚动，可以保证在滑动过程中，不让页面可以上下滚动，造成不好的体验
			e.stopPropagation && e.stopPropagation() 
			e.preventDefault && e.preventDefault()
			
			this.moving = true
			this.touching = true
			
			// 获取元素ref
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
				exporession = `round(max(${min}, min(${exporession}, ${max})) / ${step}) * ${step}`
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
					this.touching = false
				}
			})
		}
	}
}
