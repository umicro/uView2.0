<template>
	<u-transition
	    mode="slide-down"
	    :customStyle="containerStyle"
	    :show="showStatus"
	>
		<view
		    class="u-notify"
		    :class="[`u-notify--${type}`]"
		    :style="[backgroundColor]"
		>
			<text
			    class="u-notify__text"
			    :style="{
					fontSize: $u.addUnit(fontSize),
					color: color 
				}"
			>{{ message }}</text>
		</view>
	</u-transition>
</template>

<script>
	import props from './props.js'
	/**
	 * notify 顶部提示
	 * @description 该组件一般用于页面顶部向下滑出一个提示，尔后自动收起的场景
	 * @tutorial
	 * @property {String Number} top 到顶部的距离
	 * @property {Boolean} show 是否展示组件
	 * @property {String} type主题，primary，success，warning，error
	 * @property {String} color 字体颜色
	 * @property {String} bgColor 背景颜色
	 * @property {String} message 展示的文字内容
	 * @property {String} duration 展示时长，为0时不消失，单位ms
	 * @property {String} fontSize  字体大小
	 * @example <u-upload :action="action" :fileList="fileList" ></u-upload>
	 */
	export default {
		name: 'u-notify',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				timer: null,
				showStatus: false
			}
		},
		watch: {
			show: {
				immediate: true,
				handler(n) {
					// 根据true或者false，开启或者关闭组件
					n === true ? this.open() : this.close()
				}
			}
		},
		computed: {
			containerStyle() {
				const style = {
					top: uni.$u.addUnit(this.top),
					// 因为组件底层为u-transition组件，必须将其设置为fixed定位
					// 让其出现在导航栏底部
					position: 'fixed',
					left: 0,
					right: 0
				}
				return style
			},
			// 组件背景颜色
			backgroundColor() {
				const style = {}
				if (this.bgColor) {
					style.backgroundColor = this.bgColor
				}
				console.log(style);
				return style
			}
		},
		methods: {
			open() {
				// 任何定时器初始化之前，都要执行清除操作，否则可能会造成混乱
				clearTimeout(this.timer)
				this.timer = null
				if (this.duration > 0 && this.duration !== Infinity) {
					// 等待组件创建完毕
					this.$nextTick(function() {
						this.showStatus = true
					})
					// 定时结束后，关闭组件
					this.timer = setTimeout(() => {
						this.close()
					}, this.duration)
				}
			},
			// 关闭notify
			close() {
				clearTimeout(this.timer)
				this.timer = null
				// 标记组件为关闭状态
				this.showStatus = false
			}
		}
	}
</script>

<style lang="scss">
	$u-notify-padding: 8px 0 !default;
	$u-notify-text-font-size: 15px !default;
	$u-notify-primary-bgColor: $u-primary !default;
	$u-notify-success-bgColor: $u-success !default;
	$u-notify-error-bgColor: $u-error !default;
	$u-notify-warning-bgColor: $u-warning !default;


	.u-notify {
		padding: $u-notify-padding;

		&__text {
			font-size: $u-notify-text-font-size;
			text-align: center;
		}

		&--primary {
			background-color: $u-notify-primary-bgColor;
		}

		&--success {
			background-color: $u-notify-success-bgColor;
		}

		&--error {
			background-color: $u-notify-error-bgColor;
		}

		&--warning {
			background-color: $u-notify-warning-bgColor;
		}
	}
</style>
