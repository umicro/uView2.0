<template>
	<view class="u-collapse-item">
		<u-cell
		    :title="title"
		    :value="value"
		    :label="label"
		    :icon="icon"
		    :isLink="isLink"
		    :clickable="clickable"
		    :border="border && showBorder"
		    @click="clickHandler"
		    :arrowDirection="expanded ? 'up' : 'down'"
		    :disabled="disabled"
		>
			<slot
			    name="title"
			    slot="title"
			/>
			<slot
			    name="icon"
			    slot="icon"
			/>
			<slot
			    name="value"
			    slot="value"
			/>
			<slot
			    name="right-icon"
			    slot="right-icon"
			/>
		</u-cell>
		<view
		    class="u-collapse-item__content"
		    :animation="animationData"
		    ref="animation"
		>
			<text
			    class="u-collapse-item__content__text content-class"
			    :id="elId"
			    :ref="elId"
			>
				<slot /></text>
		</view>
		<u-line></u-line>
	</view>
</template>

<script>
	import props from './props.js';
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	const dom = uni.requireNativePlugin('dom')
	// #endif
	/**
	 * collapseItem 折叠面板Item
	 * @description 通过折叠面板收纳内容区域（搭配u-collapse使用）
	 * @tutorial https://www.uviewui.com/components/collapse.html
	 * @property {String} title 面板标题
	 * @property {String Number} index 主要用于事件的回调，标识那个Item被点击
	 * @property {Boolean} disabled 面板是否可以打开或收起（默认false）
	 * @property {Boolean} open 设置某个面板的初始状态是否打开（默认false）
	 * @property {String Number} name 唯一标识符，如不设置，默认用当前collapse-item的索引值
	 * @property {String} align 标题的对齐方式（默认left）
	 * @property {Object} active-style 不显示箭头时，可以添加当前选择的collapse-item活动样式，对象形式
	 * @event {Function} change 某个item被打开或者收起时触发
	 * @example <u-collapse-item :title="item.head" v-for="(item, index) in itemList" :key="index">{{item.body}}</u-collapse-item>
	 */
	export default {
		name: "u-collapse-item",
		mixins: [uni.$u.mixin,props],
		data() {
			return {
				elId: uni.$u.guid(),
				// uni.createAnimation的导出数据
				animationData: {},
				// 是否展开状态
				expanded: false,
				// 根据expanded确定是否显示border，为了控制展开时，cell的下划线更好的显示效果，进行一定时间的延时
				showBorder: false,
			};
		},
		watch: {
			expanded(n) {
				clearTimeout(this.timer)
				this.timer = null
				// 这里根据expanded的值来进行一定的延时，是为了cell的下划线更好的显示效果
				this.timer = setTimeout(() => {
					this.showBorder = n
				}, n ? 10 : 290)
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 异步获取内容，或者动态修改了内容时，需要重新初始化
			init() {
				// 初始化数据
				this.updateParentData()
				if (!this.parent) {
					return uni.$u.error('u-collapse-item必须要搭配u-collapse组件使用')
				}
				const {
					value,
					accordion,
					children = []
				} = this.parent

				if (accordion) {
					if (uni.$u.test.array(value)) {
						return uni.$u.error('手风琴模式下，u-collapse组件的value参数不能为数组')
					}
					this.expanded = this.name == value
				} else {
					if (!uni.$u.test.array(value) && value !== null) {
						return uni.$u.error('非手风琴模式下，u-collapse组件的value参数必须为数组')
					}
					this.expanded = (value || []).some(item => item == this.name)
				}
				// 设置组件的展开或收起状态
				this.$nextTick(function() {
					this.setContentAnimate()
				})
			},
			updateParentData() {
				// 此方法在mixin中
				this.getParentData('u-collapse')
			},
			async setContentAnimate() {
				// 每次面板打开或者收起时，都查询元素尺寸
				// 好处是，父组件从服务端获取内容后，变更折叠面板后可以获得最新的高度
				const rect = await this.queryRect()
				const height = this.expanded ? rect.height : 0

				// #ifdef APP-NVUE
				const ref = this.$refs['animation'].ref
				animation.transition(ref, {
					styles: {
						height: height + 'px'
					},
					duration: 300,
					// 必须设置为true，否则会到面板收起或展开时，页面其他元素不会随之调整它们的布局
					needLayout: true,
					timingFunction: 'ease-in-out',
				})
				// #endif

				// #ifndef APP-NVUE
				const animation = uni.createAnimation({
					timingFunction: 'ease-in-out',
				});
				animation
					.height(height)
					.step({
						duration: 300,
					})
					.step()
				// 导出动画数据给面板的animationData值
				this.animationData = animation.export()
				// #endif
			},
			// 点击collapsehead头部
			clickHandler() {
				if (this.disabled) return

				// 设置本组件为相反的状态
				this.parent && this.parent.onChange(this)
			},
			// 查询内容高度
			queryRect() {
				// #ifndef APP-NVUE
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				return new Promise(resolve => {
					this.$uGetRect(`#${this.elId}`).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE
				// nvue下，使用dom模块查询元素高度
				// 返回一个promise，让调用此方法的主体能使用then回调
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs[this.elId], res => {
						resolve(res.size)
					})
				})
				// #endif
			}
		},
	};
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-collapse-item {

		&__content {
			overflow: hidden;
			height: 0;

			&__text {
				padding: 12px 15px;
				color: $u-content-color;
				font-size: 14px;
				line-height: 18px;
			}
		}
	}
</style>
