// 定义一个一定时间后自动成功的promise，让调用nextTick方法处，进入下一个then方法
const nextTick = () => new Promise(resolve => setTimeout(resolve, 1000 / 30));

// #ifndef APP-NVUE
// 定义类名，通过给元素动态切换类名，赋予元素一定的css动画样式
const getClassNames = (name) => ({
	enter: `u-${name}-enter u-${name}-enter-active`,
	'enter-to': `u-${name}-enter-to u-${name}-enter-active`,
	leave: `u-${name}-leave u-${name}-leave-active`,
	'leave-to': `u-${name}-leave-to u-${name}-leave-active`
})
// #endif

// #ifdef APP-NVUE
// 引入nvue(weex)的animation动画模块，文档见：
// https://weex.apache.org/zh/docs/modules/animation.html#transition
const animation = uni.requireNativePlugin('animation')
// nvue动画模块实现细节抽离在外部文件
import animationMap from './nvue.ani-map.js'
const getStyle = (name) => animationMap[name]
// #endif

export default {
	methods: {
		// 组件被点击发出事件
		clickHandler() {
			this.$emit('click');
		},
		// #ifndef APP-NVUE
		// vue版本的组件进场处理
		vueEnter() {
			// // 动画进入时的类名
			const classNames = getClassNames(this.mode);
			// 定义状态和发出动画进入前事件
			this.status = 'enter';
			this.$emit('before-enter');
			// 此处nextTick等待了几十ms，是为了等待元素创建完成
			Promise.resolve().then(nextTick).then(() => {
				// 组件正在进入中的事件
				this.$emit('enter');
				this.inited = true;
				this.display = true;
				this.classes = classNames.enter;
			}).then(nextTick).then(() => {
				// 组件动画进入后触发的事件
				this.$emit('after-enter');
				// 标识动画尚未结束
				this.transitionEnded = false;
				// 赋予组件enter-to类名
				this.classes = classNames['enter-to'];
			}).catch(() => {})
		},
		// 动画离场处理
		vueLeave() {
			// 如果不是展示状态，无需执行逻辑
			if (!this.display) return;
			const classNames = getClassNames(this.mode)
			// 标记离开状态和发出事件
			this.status = 'leave';
			this.$emit('before-leave');
			Promise.resolve()
				.then(nextTick)
				.then(() => {
					// 正在离开的事件
					this.$emit('leave');
					// 获得类名
					this.classes = classNames.leave
				})
				.then(nextTick)
				.then(() => {
					// 标记动画已经结束了
					this.transitionEnded = false
					// 组件执行动画，到了执行的执行时间后，执行一些额外处理
					setTimeout(this.onTransitionEnd, this.duration);
					this.classes = classNames['leave-to'];
				})
				.catch(() => {})
		},
		// #endif
		// #ifdef APP-NVUE
		// nvue版本动画进场
		nvueEnter() {
			// 获得样式的名称
			const currentStyle = getStyle(this.mode);
			// 组件动画状态和发出事件
			this.status = 'enter'
			this.$emit('before-enter')
			// 展示生成组件元素
			this.inited = true
			this.display = true 
			// 合并样式
			this.viewStyle = Object.assign({}, this.viewStyle, currentStyle.enter)
			Promise.resolve()
				.then(nextTick)
				.then(() => {
					// 组件开始进入前的事件
					this.$emit('enter')
					// nvue的transition动画模块需要通过ref调用组件，注意此处的ref不同于vue的this.$refs['u-ani']用法
					// 此模块具体用法，可参考：https://weex.apache.org/zh/docs/modules/animation.html#transition
					animation.transition(this.$refs['u-ani'].ref, {
						styles: currentStyle['enter-to'],
						duration: this.duration,
						timingFunction: this.timingFunction,
						needLayout: false,
						delay: 0
					}, () => {
						// 动画执行完毕，发出事件
						this.$emit('after-enter')
					})
				})
				.catch(() => {})
		},
		nvueLeave() {
		    if (!this.display) {
		        return
		    }
		    const currentStyle = getStyle(this.mode)
			// 定义状态和事件
		    this.status = 'leave'
		    this.$emit('before-leave')
			// 合并样式
		    this.viewStyle = Object.assign({}, this.viewStyle, currentStyle.leave)
			// 放到promise中处理执行过程
		    Promise.resolve()
		        .then(nextTick) // 等待几十ms
		        .then(() => {
		            this.transitionEnded = false
					// 动画正在离场的状态
		            this.$emit('leave-to')
		            animation.transition(this.$refs['u-ani'].ref, {
		                styles: currentStyle['leave-to'],
		                duration: this.duration,
		                timingFunction: this.timingFunction,
		                needLayout: false,
		                delay: 0
		            }, () => {
		                this.onTransitionEnd()
		            })
		        })
		        .catch(() => {})
		},
		// #endif
		// 完成过渡后触发
		onTransitionEnd() {
			// 如果已经是结束的状态，无需再处理
			if (this.transitionEnded) return;
			this.transitionEnded = true;
			// 发出组件动画执行后的事件
			this.$emit(`after-${this.status}`)
			if (!this.show && this.display) {
				this.display = false
				// #ifdef APP-NVUE
				this.inited = false
				// #endif  
			}
		}
	}
}
