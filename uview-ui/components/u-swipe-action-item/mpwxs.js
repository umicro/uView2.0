export default {
	data() {
		return {
			position: [],
			buttonGroup: [],
			buttonLeft: {},
			buttonRight: {},
			btns: "[]",
			btnLeft: "[]",
			btnRight: "[]"
		}
	},
	// computed: {
	// 	pos() {
	// 		return JSON.stringify(this.position)
	// 	},
	// 	btn() {
	// 		return JSON.stringify(this.button)
	// 	}
	// },
	watch: {
		buttonGroup: {
			handler(newVal) {
				this.btns = JSON.stringify(newVal)
			},
			deep: true
		},
		buttonLeft: {
			handler(newVal) {
				this.btnLeft = JSON.stringify(newVal)
			},
			deep: true
		},
		buttonRight: { 
			handler(newVal) {
				this.btnRight = JSON.stringify(newVal)
			},
			deep: true
		},
		show(newVal) {
			if (this.autoClose) return
			if (!this.button) {
				this.init()
				return
			}
			this.button.show = newVal
		},
		leftOptions() {
			this.init()
		},
		rightOptions() {
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
			// 为了避免定时器混乱，任何定时器开始之间，都应该先清除该定时器
			clearTimeout(this.swipetimer)
			this.swipetimer = setTimeout(() => {
				// 分别获取按钮组的尺寸
				this.getButtonGroupSize()
				this.getLeftButtonSize()
				this.getRightButtonSize()
			}, 50)
		},
		closeSwipe(e) {
			// 关闭其他的单元格
			if (!this.autoClose) return
			this.swipeaction.closeOther(this)
		},

		change(e) {
			// 单元格状态发生改变时，发出事件
			this.$emit('change', e.open)
			let show = this.buttonGroup.show
			if (show !== e.open) {
				this.buttonGroup.show = e.open
			}
		},

		appTouchStart(e) {
			const {
				clientX
			} = e.changedTouches[0]
			this.clientX = clientX
			this.timestamp = Number(new Date())
		},
		appTouchEnd(e, index, item, position) {
			const {
				clientX
			} = e.changedTouches[0]
			// 模拟点击事件，解决 ios 13 点击区域错位的问题
			let diff = Math.abs(this.clientX - clientX)
			let time = Number(new Date()) - this.timestamp
			if (diff < 40 && time < 300) {
				this.$emit('click', {
					content: item,
					index,
					position
				})
			}
		},
		getButtonGroupSize() {
			const views = uni.createSelectorQuery().in(this)
			views
				.selectAll('.u-swipe__button-group')
				.boundingClientRect(data => {
					let show = 'none'
					if (this.autoClose) {
						show = 'none'
					} else {
						show = this.show
					}
					this.buttonGroup = {
						data,
						show
					}
				})
				.exec()
		},
		getLeftButtonSize() {
			const views = uni.createSelectorQuery().in(this)
			views
				.selectAll('.button-hock--left')
				.boundingClientRect(data => {
					this.buttonLeft = data
				})
				.exec()
		},
		getRightButtonSize() {
			const views = uni.createSelectorQuery().in(this)
			views
				.selectAll('.button-hock--right')
				.boundingClientRect(data => {
					this.buttonRight = data
				})
				.exec()
		},
	}
}
