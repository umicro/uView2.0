<template>
	<view class="u-collapse">
		<u-line v-if="border"></u-line>
		<slot />
	</view>
</template>

<script>
	/**
	 * collapse 手风琴
	 * @description 通过折叠面板收纳内容区域
	 * @tutorial https://www.uviewui.com/components/collapse.html
	 * @property {Boolean} accordion 是否手风琴模式（默认true）
	 * @property {Boolean} arrow 是否显示标题右侧的箭头（默认true）
	 * @property {String} arrow-color 标题右侧箭头的颜色（默认#909399）
	 * @property {Object} head-style 标题自定义样式，对象形式
	 * @property {Object} body-style 主体自定义样式，对象形式
	 * @property {String} hover-class 样式类名，按下时有效（默认u-hover-class）
	 * @event {Function} change 当前激活面板展开时触发(如果是手风琴模式，参数activeNames类型为String，否则为Array)
	 * @example <u-collapse></u-collapse>
	 */
	export default {
		name: "u-collapse",
		mixins: [uni.$u.mixin],
		props: {
			// 当前展开面板的name，非手风琴模式：[<string | number>]，手风琴模式：string | number
			value: {
				type: [String, Number, Array],
				default: null
			},
			// 是否手风琴模式
			accordion: {
				type: Boolean,
				default: false
			},
			// 是否显示外边框
			border: {
				type: Boolean,
				default: true
			},
		},
		watch: {
			needInit() {
				this.init()
			}
		},
		created() {
			this.children = []
		},
		computed: {
			needInit() {
				// 通过computed，同时监听accordion和value值的变化
				// 再通过watch去执行init()方法，进行再一次的初始化
				return [this.accordion, this.value]
			}
		},
		methods: {
			// 重新初始化一次内部的所有子元素
			init() {
				this.children.map(child => {
					child.init()
				})
			},
			/**
			 * collapse-item被点击时触发，由collapse统一处理各子组件的状态
			 * @param {Object} target 被操作的面板的实例
			 */
			onChange(target) {
				let changeArr = []
				this.children.map((child, index) => {
					// 如果是手风琴模式，将其他的折叠面板收起来
					if (this.accordion) {
						child.expanded = child === target ? !target.expanded : false
						child.setContentAnimate()
					} else {
						if(child === target) {
							child.expanded = !child.expanded
							child.setContentAnimate()
						}
					}
					// 拼接change事件中，数组元素的状态
					changeArr.push({
						// 如果没有定义name属性，则默认返回组件的index索引
						name: child.name || index,
						status: child.expanded ? 'open' : 'close'
					})
				}) 
				
				this.$emit('change', changeArr)
				this.$emit(target.expanded ? 'open' : 'close', target.name)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
</style>
