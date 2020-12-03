const MIN_DISTANCE = 10;
export default {
	data() {
		return {
			left: 0,
			buttonShow: 'none',
			ani: false,
			moveLeft: 0
		}
	},
	watch: {
		// 监听状态的变化
		show(newVal) {
			if (this.autoClose) return
			this.openState(newVal)
		},
		left(){
			this.moveLeft = `translateX(${this.left}px)`
		},
		// 按钮准备就绪，该值会发生变化
		buttonShow(newVal){
			if (this.autoClose) return
			this.openState(newVal)
		},
		// 左边按钮就绪
		leftOptions() {
			this.init()
		},
		// 右边按钮就绪
		rightOptions() {
			this.init()
		}
	},
	mounted() {
		// 将子组件添加到父组件(u-swipe-action)的children数组中
		if (this.swipeaction.children !== undefined) {
			this.swipeaction.children.push(this)
		}
		this.init()
	},
	beforeDestoy() {
		// 销毁组件之前，移除父组件(u-swipe-action)中的children数组中子组件的实例
		this.swipeaction.children.forEach((item, index) => {
			if (item === this) {
				this.swipeaction.children.splice(index, 1)
			}
		})
	},
	methods: {
		init(){
			// 在执行定时器之前，一定要先清除定时器，否则可能会造成混乱
			clearTimeout(this.timer)
			this.timer = setTimeout(() => {
				// 查询左右按钮的尺寸
				this.getSelectorQuery()
			}, 100)
			// 移动距离
			this.left = 0
			this.x = 0
		},
		// 打开某一个单元格，是否自动关闭其他已打开的单元格
		closeSwipe(e) {
			if (!this.autoClose) return
			this.swipeaction.closeOther(this)
		},
		// 开始触摸
		appTouchStart(e) {
			const {
				clientX
			} = e.changedTouches[0]
			this.clientX = clientX
			// 开始触摸时的时间戳
			this.timestamp = Number(new Date())
		},
		// 触摸结束
		appTouchEnd(e, index, item, position) {
			const {
				clientX
			} = e.changedTouches[0]
			// 模拟点击事件，解决 ios 13 点击区域错位的问题
			let diff = Math.abs(this.clientX - clientX)
			// 触摸结束时，记录当前时间和触摸开始时的时间戳之差
			let time = (new Date().getTime()) - this.timestamp
			if (diff < 40 && time < 300) {
				// 发出点击事件
				this.$emit('click', {
					content: item,
					index,
					position
				})
			}
		},
		// 触摸开始
		touchstart(e) {
			if (this.disabled) return
			this.ani = false
			this.x = this.left || 0
			this.stopTouchStart(e)
			// 关闭其他打开状态的单元格
			this.autoClose && this.closeSwipe()
		},
		touchmove(e) {
			if (this.disabled) return
			// 是否可以滑动页面
			this.stopTouchMove(e);
			// 如果是垂直滑动，不执行
			if (this.direction !== 'horizontal') {
				return;
			}
			// 执行滑动
			this.move(this.x + this.deltaX)
		},
		// 触摸结束
		touchend() {
			if (this.disabled) return
			this.moveDirection(this.left)
		},
		/**
		 * 设置移动距离
		 * @param {Object} value
		 */
		move(value) {
			value = value || 0
			const leftWidth = this.leftWidth
			const rightWidth = this.rightWidth
			// 获取可滑动范围
			this.left = this.range(value, -rightWidth, leftWidth);
		},

		/**
		 * 获取范围
		 * @param {Object} num
		 * @param {Object} min
		 * @param {Object} max
		 */
		range(num, min, max) {
			return Math.min(Math.max(num, min), max);
		},
		/**
		 * 移动方向判断
		 * @param {Object} left
		 * @param {Object} value
		 */
		moveDirection(left) {
			const threshold = this.threshold
			const isopen = this.isopen || 'none'
			const leftWidth = this.leftWidth
			const rightWidth = this.rightWidth
			if (this.deltaX === 0) {
				this.openState('none')
				return
			}
			if ((isopen === 'none' && rightWidth > 0 && -left > threshold) || (isopen !== 'none' && rightWidth > 0 && rightWidth +
					left < threshold)) {
				// right
				this.openState('right')
			} else if ((isopen === 'none' && leftWidth > 0 && left > threshold) || (isopen !== 'none' && leftWidth > 0 &&
					leftWidth - left < threshold)) {
				// left
				this.openState('left')
			} else {
				// default
				this.openState('none')
			}
		},

		/**
		 * 开启状态
		 * @param {Boolean} type
		 */
		openState(type) {
			const leftWidth = this.leftWidth
			const rightWidth = this.rightWidth
			let left = ''
			this.isopen = this.isopen ? this.isopen : 'none'
			switch (type) {
				case "left":
					left = leftWidth
					break
				case "right":
					left = -rightWidth
					break
				default:
					left = 0
			}


			if (this.isopen !== type) {
				this.throttle = true
				this.$emit('change', type)
			}

			this.isopen = type
			// 添加动画类
			this.ani = true
			this.$nextTick(() => {
				this.move(left)
			})
			// 设置最终移动位置,理论上只要进入到这个函数，肯定是要打开的
		},
		close() {
			this.openState('none')
		},
		getDirection(x, y) {
			if (x > y && x > MIN_DISTANCE) {
				return 'horizontal';
			}
			if (y > x && y > MIN_DISTANCE) {
				return 'vertical';
			}
			return '';
		},

		/**
		 * 重置滑动状态
		 * @param {Object} event
		 */
		resetTouchStatus() {
			this.direction = '';
			this.deltaX = 0;
			this.deltaY = 0;
			this.offsetX = 0;
			this.offsetY = 0;
		},

		/**
		 * 设置滑动开始位置
		 * @param {Object} event
		 */
		stopTouchStart(event) {
			this.resetTouchStatus();
			const touch = event.touches[0];
			this.startX = touch.clientX;
			this.startY = touch.clientY;
		},

		/**
		 * 滑动中，是否禁止打开
		 * @param {Object} event
		 */
		stopTouchMove(event) {
			const touch = event.touches[0];
			this.deltaX = touch.clientX - this.startX;
			this.deltaY = touch.clientY - this.startY;
			this.offsetX = Math.abs(this.deltaX);
			this.offsetY = Math.abs(this.deltaY);
			this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
		},

		/**
		 * 查询节点，也就是左右边隐藏按钮的尺寸
		 */
		getSelectorQuery() {
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
					this.leftWidth = data[0].width || 0
					this.rightWidth = data[1].width || 0
					this.buttonShow = show
				})
				.exec()
		}
	}
}
