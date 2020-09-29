<template>
	<view 
		v-if="inited"
		class="u-transition" 
		ref="u-ani" 
		@tap.stop.prevent="clickHandler"
		:class="classes"
		:style="[viewStyle]"
	>
		<slot />
	</view>
</template>

<script>
	// 组件的methods方法，由于内容较长，写在外部文件中通过mixin引入
	import transition from "./transition.js";
	export default {
		name: 'u-transition',
		props: {
			// 是否展示组件
			show: {
				type: Boolean,
				default: true
			},
			// 使用的动画模式
			mode: {
				type: Array,
				default () {
					return []
				}
			},
			// 动画的执行时间，单位ms
			duration: {
				type: [String, Number],
				default: 300
			},
			// 自定义样式，对象形式
			customStyle: {
				type: Object, 
				default: {
					return {}
				}
			}
		},
		data() {
			return {
				inited: false, // 是否显示/隐藏组件
				viewStyle: {}, // 组件内部的样式
				status: '', // 记录组件动画的状态
				transitionEnded: false, // 组件是否结束的标记
				display: false, // 组件是否展示
				classes: '', // 应用的类名
			}	
		},
		// 将mixin挂在到组件中，uni.$u.mixin实际上为一个vue格式对象
		mixins: [uni.$u.mixin, transition],
		watch: {
			show: {
				hander(newVal) {
					// vue和nvue分别执行不同的方法
					// #ifdef APP-NVUE
					newVal ? this.vueEnter() : this.vueEnter();
					// #endif
					// #ifndef APP-NVUE
					newVal ? this.nvueEnter() : this.nvueEnter();
					// #endif
				},
				// 表示同时监听初始化时的props的show的意思
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
	
	.u-transition {
	    transition-timing-function: ease;
	}
	
	/* #ifndef APP-NVUE */
	
	.u-fade-enter-active,
	.u-fade-leave-active {
	    transition-property: opacity;
	}
	
	.u-fade-enter,
	.u-fade-leave-to {
	    opacity: 0
	}
	
	.u-fade-down-enter-active,
	.u-fade-down-leave-active,
	.u-fade-left-enter-active,
	.u-fade-left-leave-active,
	.u-fade-right-enter-active,
	.u-fade-right-leave-active,
	.u-fade-up-enter-active,
	.u-fade-up-leave-active {
	    transition-property: opacity, transform;
	}
	
	.u-fade-up-enter,
	.u-fade-up-leave-to {
	    transform: translate3d(0, 100%, 0);
	    opacity: 0
	}
	
	.u-fade-down-enter,
	.u-fade-down-leave-to {
	    transform: translate3d(0, -100%, 0);
	    opacity: 0
	}
	
	.u-fade-left-enter,
	.u-fade-left-leave-to {
	    transform: translate3d(-100%, 0, 0);
	    opacity: 0
	}
	
	.u-fade-right-enter,
	.u-fade-right-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0
	}
	
	.u-slide-down-enter-active,
	.u-slide-down-leave-active,
	.u-slide-left-enter-active,
	.u-slide-left-leave-active,
	.u-slide-right-enter-active,
	.u-slide-right-leave-active,
	.u-slide-up-enter-active,
	.u-slide-up-leave-active {
	    transition-property: transform;
	}
	
	.u-slide-up-enter,
	.u-slide-up-leave-to {
	    transform: translate3d(0, 100%, 0)
	}
	
	.u-slide-down-enter,
	.u-slide-down-leave-to {
	    transform: translate3d(0, -100%, 0)
	}
	
	.u-slide-left-enter,
	.u-slide-left-leave-to {
	    transform: translate3d(-100%, 0, 0)
	}
	
	.u-slide-right-enter,
	.u-slide-right-leave-to {
	    transform: translate3d(100%, 0, 0)
	}
	
	.u-zoom-in-enter-active,
	.u-zoom-in-leave-active,
	.u-zoom-out-enter-active,
	.u-zoom-out-leave-active {
	    transition-property: transform;
	}
	
	.u-zoom-in-enter,
	.u-zoom-in-leave-to {
	    transform: scale(0.8)
	}
	
	.u-zoom-out-enter,
	.u-zoom-out-leave-to {
	    transform: scale(1.2)
	}
	/* #endif */
</style>
