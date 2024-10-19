<template>
	<uvImage
		:src="src"
		:mode="mode"
		:width="width"
		:height="height"
		:shape="shape"
		:radius="radius"
		:lazyLoad="lazyLoad"
		:showMenuByLongpress="showMenuByLongpress"
		:loadingIcon="loadingIcon"
		:errorIcon="errorIcon"
		:showLoading="showLoading"
		:showError="showError"
		:fade="fade"
		:webp="webp"
		:duration="duration"
		:bgColor="bgColor"
		:customStyle="customStyle"
		@click="$emit('click')"
		@error="$emit('error')"
		@load="$emit('load')"
	>
		<template v-slot:loading>
			<slot name="loading"></slot>
		</template>
		<template v-slot:error>
			<slot name="error"></slot>
		</template>
	</uvImage>
</template>

<script>
	/**
	 * 此组件存在的理由是，在nvue下，u-image被uni-app官方占用了，u-image在nvue中相当于image组件
	 * 所以在nvue下，取名为u--image，内部其实还是u-iamge.vue，只不过做一层中转
	 */
	import uvImage from '../u-image/u-image.vue';
	import props from '../u-image/props.js';
	/**
	 * Image 图片
	 * @description 此组件为uni-app的image组件的加强版，在继承了原有功能外，还支持淡入动画、加载中、加载失败提示、圆角值和形状等。
	 * @tutorial https://uviewui.com/components/image.html
	 * @property {String}			src 				图片地址
	 * @property {String}			mode 				裁剪模式，见官网说明 （默认 'aspectFill' ）
	 * @property {String | Number}	width 				宽度，单位任意，如果为数值，则为px单位 （默认 '300' ）
	 * @property {String | Number}	height 				高度，单位任意，如果为数值，则为px单位 （默认 '225' ）
	 * @property {String}			shape 				图片形状，circle-圆形，square-方形 （默认 'square' ）
	 * @property {String | Number}	radius		 		圆角值，单位任意，如果为数值，则为px单位 （默认 0 ）
	 * @property {Boolean}			lazyLoad			是否懒加载，仅微信小程序、App、百度小程序、字节跳动小程序有效 （默认 true ）
	 * @property {Boolean}			showMenuByLongpress	是否开启长按图片显示识别小程序码菜单，仅微信小程序有效 （默认 true ）
	 * @property {String}			loadingIcon 		加载中的图标，或者小图片 （默认 'photo' ）
	 * @property {String}			errorIcon 			加载失败的图标，或者小图片 （默认 'error-circle' ）
	 * @property {Boolean}			showLoading 		是否显示加载中的图标或者自定义的slot （默认 true ）
	 * @property {Boolean}			showError 			是否显示加载错误的图标或者自定义的slot （默认 true ）
	 * @property {Boolean}			fade 				是否需要淡入效果 （默认 true ）
	 * @property {Boolean}			webp 				只支持网络资源，只对微信小程序有效 （默认 false ）
	 * @property {String | Number}	duration 			搭配fade参数的过渡时间，单位ms （默认 500 ）
	 * @property {String}			bgColor 			背景颜色，用于深色页面加载图片时，为了和背景色融合  (默认 '#f3f4f6' )
	 * @property {Object}			customStyle  		定义需要用到的外部样式
	 * @event {Function}	click	点击图片时触发
	 * @event {Function}	error	图片加载失败时触发
	 * @event {Function} load 图片加载成功时触发
	 * @example <u--image width="100%" height="300px" :src="src"></u--image>
	 */
	export default {
		name: 'u--image',
		mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
		components: {
			uvImage
		},
	}
</script>
