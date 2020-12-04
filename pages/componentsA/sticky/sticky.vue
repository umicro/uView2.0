<template>
	<view>
		<view class="text">
			1111111
		</view>
		<u-sticky>
			<view
			    class="box1"
			    ref="box"
			>
				1111111
				22222222<br>
				3333333<br>
				44444444
			</view>
		</u-sticky>
		<u-sticky>
			<view
			    class="box2"
			    ref="box"
			>
				1111111
				22222222<br>
				3333333<br>
				44444444
			</view>
		</u-sticky>
		<view class="text2">

		</view>
	</view>
</template>

<script>
	// const dom = uni.requireNativePlugin('dom')
	export default {
		data() {
			return {

			}
		},
		mixins: [uni.$u.mixin],
		onReady() {
			// dom.getComponentRect(this.$refs.box, option => {
			// 	console.log('getComponentRect:', option)
			// })
			// this.checkSupportCssSticky()
		},
		methods: {
			// 在APP和微信小程序上，通过uni.createSelectorQuery可以判断是否支持css sticky
			checkSupportCssSticky() {
				return new Promise(resolve => {
					uni.createSelectorQuery().in(this).select(".box1").fields({
						computedStyle: ["position"]
					}).exec(e => {
						console.log(e);
						resolve('sticky' === e[0].position)
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.text {
		height: 300px;
		border-color: red;
		border-width: 1px;
	}

	.box1,
	.box2 {
		width: 100px;
		height: 100px;
		background-color: $u-primary;
	}

	.box2 {
		background-color: $u-success;
	}

	.text2 {
		height: 1700px;
	}
</style>
