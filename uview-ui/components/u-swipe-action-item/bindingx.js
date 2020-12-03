// 引入bindingx，此库类似于微信小程序wxs，目的是让js运行在视图层，减少视图层和逻辑层的通信折损
const BindingX = uni.requireNativePlugin('bindingx');
// nvue操作dom的库，用于获取dom的尺寸信息
const dom = uni.requireNativePlugin('dom');
// nvue中用于操作元素动画的库，类似于uni.animation，只不过uni.animation不能用于nvue
const animation = uni.requireNativePlugin('animation');

export default {
	data() {
		return {}
	},

	watch: {
		// 监听show值的变化，用于自动打开或者关闭单元格
		show(newVal) {
			if (this.autoClose) return
			if (this.stop) return
			this.stop = true
			if (newVal) {
				this.open(newVal)
			} else {
				this.close()
			}
		},
		// 单元格左边按钮值变化时，执行元素节点查询(因为按钮可能变多或者变化了，最终尺寸会变化)，并重新初始化
		leftOptions() {
			this.getSelectorQuery()
			this.init()
		},
		// 同上
		rightOptions(newVal) {
			this.init()
		}
	},
	created() {
		// swipeaction值为父组件的this示例，通过inject注入，在u-swipe-action-item中被声明
		if (this.swipeaction.children !== undefined) {
			// 将子组件的实例，添加到父组件的数组中，方便后续需要自动关闭时，进行统一管理，实现打开一个，自动关闭其他单元格的“互斥”功能
			this.swipeaction.children.push(this)
		}
	},
	mounted() {
		// 获取各个元素的ref实例
		this.box = this.getEl(this.$refs['selector-box--hock'])
		this.selector = this.getEl(this.$refs['selector-content--hock']);
		this.leftButton = this.getEl(this.$refs['selector-left-button--hock']);
		this.rightButton = this.getEl(this.$refs['selector-right-button--hock']);
		this.init()
	},
	beforeDestroy() {
		// 在组件生命周期销毁时，移除在父组件u-swipe-action的children数组中的本组件的实例
		this.swipeaction.children.forEach((item, index) => {
			if (item === this) {
				this.swipeaction.children.splice(index, 1)
			}
		})
	},
	methods: {
		init() {
			// 放到生命周期的最后去初始化一些变量值
			this.$nextTick(() => {
				this.x = 0
				this.button = {
					show: false
				}
				setTimeout(() => {
					// 延后一段时间去查询节点
					this.getSelectorQuery()
				}, 200)
			})
		},
		onClick(index, item, position) {
			this.$emit('click', {
				content: item,
				index,
				position
			})
		},
		touchstart(e) {
			// 每次只触发一次，避免多次监听造成闪烁
			if (this.stop) return
			this.stop = true
			// 如果开启了自动关闭的配置，关闭其他已打开的单元格
			if (this.autoClose) {
				this.swipeaction.closeOther(this)
			}
			// 左右按钮组的宽度	
			const leftWidth = this.button.left.width
			const rightWidth = this.button.right.width
			// 计算所需的操作表达式，详见bindingx文档
			// https://alibaba.github.io/bindingx/guide/cn_guide_start
			let expression = this.range(this.x, -rightWidth, leftWidth)
			let leftExpression = this.range(this.x - leftWidth, -leftWidth, 0)
			let rightExpression = this.range(this.x + rightWidth, 0, rightWidth)

			this.eventpan = BindingX.bind({
				// 事件的触发对象，为某一个元素的ref实例，这里为整个单元格的最外层元素的实例
				anchor: this.box,
				// pan为手势事件
				eventType: 'pan',
				// props为需要作用于某些元素的某些属性的集合
				// 比如这里为三个元素的数组，在手势触发时候，都对它们的transform.translateX属性应用expression属性进行操作
				// https://alibaba.github.io/bindingx/guide/cn_api_api
				props: [{
					// 这里为单元格的内容部分元素(不含左右按钮的部分)
					element: this.selector,
					// 如果需要X轴平移，只能这么写，而不能写成"translateX"，详见文档：
					// https://alibaba.github.io/bindingx/guide/cn_api_attributes
					property: 'transform.translateX',
					// 作用于X轴平移时的表达式
					expression
				}, {
					element: this.leftButton,
					property: 'transform.translateX',
					expression: leftExpression
				}, {
					element: this.rightButton,
					property: 'transform.translateX',
					expression: rightExpression
				}, ]
			}, (e) => {
				// 运行时的状态回调，通常包括start|end|exit，这里在结束事件也就是end事件中，进行变量的赋值
				if (e.state === 'end') {
					// deltaX为手势pan事件具有的表示X轴偏移量的值
					this.x = e.deltaX + this.x;
					this.isclick = true
					this.bindTiming(e.deltaX)
				}
			});
		},
		// 手势触摸结束
		touchend(e) {
			if (this.isopen !== 'none' && !this.isclick) {
				this.open('none')
			}
		},
		bindTiming(x) {
			const left = this.x
			const leftWidth = this.button.left.width
			const rightWidth = this.button.right.width
			// 移动的阈值，意思为移动的距离超过了此值，才算移动了
			const threshold = this.threshold
			if (!this.isopen || this.isopen === 'none') {
				// left的值大于一个正值，说明按钮在左边，向右滑动，偏移值为正数
				if (left > threshold) {
					this.open('left')
				} else if (left < -threshold) {
					// 按钮在右边，向左滑动，偏移值为负值(X轴负方向)
					this.open('right')
				} else {
					this.open('none')
				}
			} else {
				if ((x > -leftWidth && x < 0) || x > rightWidth) {
					if ((x > -threshold && x < 0) || (x - rightWidth > threshold)) {
						this.open('left')
					} else {
						this.open('none')
					}
				} else {
					if ((x < threshold && x > 0) || (x + leftWidth < -threshold)) {
						this.open('right')
					} else {
						this.open('none')
					}
				}
			}
		},

		/**
		 * 移动范围
		 * @param {Object} num
		 * @param {Object} mix
		 * @param {Object} max
		 */
		range(num, mix, max) {
			return `min(max(x+${num}, ${mix}), ${max})`
		},

		/**
		 * 开启swipe
		 */
		open(type) {
			this.animation(type)
		},

		/**
		 * 关闭swipe
		 */
		close() {
			this.animation('none')
		},

		/**
		 * 开启关闭动画
		 * @param {Object} type
		 */
		animation(type) {
			const time = 300
			const leftWidth = this.button.left.width
			const rightWidth = this.button.right.width
			if (this.eventpan && this.eventpan.token) {
				// 取消bindingx的方法绑定，释放资源
				BindingX.unbind({
					token: this.eventpan.token,
					// pan为手势事件
					eventType: 'pan'
				})
			}

			switch (type) {
				case 'left':
					Promise.all([
						this.move(this.selector, leftWidth),
						this.move(this.leftButton, 0),
						this.move(this.rightButton, rightWidth * 2)
					]).then(() => {
						this.setEmit(leftWidth, type)
					})
					break
				case 'right':
					Promise.all([
						this.move(this.selector, -rightWidth),
						this.move(this.leftButton, -leftWidth * 2),
						this.move(this.rightButton, 0)
					]).then(() => {
						this.setEmit(-rightWidth, type)
					})
					break
				default:
					Promise.all([
						this.move(this.selector, 0),
						this.move(this.leftButton, -leftWidth),
						this.move(this.rightButton, rightWidth)
					]).then(() => {
						this.setEmit(0, type)
					})

			}
		},
		setEmit(x, type) {
			const leftWidth = this.button.left.width
			const rightWidth = this.button.right.width
			this.isopen = this.isopen || 'none'
			this.stop = false
			this.isclick = false
			// 只有状态不一致才会返回结果
			if (this.isopen !== type && this.x !== x) {
				if (type === 'left' && leftWidth > 0) {
					this.$emit('change', 'left')
				}
				if (type === 'right' && rightWidth > 0) {
					this.$emit('change', 'right')
				}
				if (type === 'none') {
					this.$emit('change', 'none')
				}
			}
			this.x = x
			this.isopen = type
		},
		move(ref, value) {
			return new Promise((resolve, reject) => {
				// 通过animation模块，移动单元格主体在X轴上的translateX属性
				animation.transition(ref, {
					styles: {
						transform: `translateX(${value})`,
					},
					duration: 150, //ms
					timingFunction: 'linear',
					needLayout: false,
					delay: 0 //ms
				}, function(res) {
					resolve(res)
				})
			})

		},

		/**
		 * 获取ref
		 * @param {Object} el
		 */
		getEl(el) {
			return el.ref
		},
		/**
		 * 获取节点信息
		 */
		getSelectorQuery() {
			// 放到Promise.all中，等左右按钮节点查询完毕之后再进行对应的赋值操作
			Promise.all([
				this.getDom('left'),
				this.getDom('right'),
			]).then((data) => {
				let show = 'none'
				if (this.autoClose) {
					show = 'none'
				} else {
					show = this.show
				}

				if (show === 'none') {
					// this.close()
				} else {
					this.open(show)
				}

			})

		},
		getDom(str) {
			return new Promise((resolve, reject) => {
				// 通过nvue的dom模块，查询节点信息
				dom.getComponentRect(this.$refs[`selector-${str}-button--hock`], (data) => {
					if (data) {
						// 最终效果为button['left'] = xxx的形式
						this.button[str] = data.size
						resolve(data)
					} else {
						reject()
					}
				})
			})
		}
	}
}
