<template>
	<view class="u-count-down">
		<slot>
			{{ formattedTime }}
		</slot>
	</view>
</template>

<script>
	import utils from './utils.js'
	import props from './props.js'
	export default {
		name: 'u-count-down',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				timer: null,
				timeData: parseTimeData(0),
				formattedTime: '0',
				// 倒计时状态，start-开始，runing-进行中，end-已结束
				status: 'start', 
				endTime: 0, // 结束的毫秒时间戳
				remainTime: 0, // 剩余的毫秒时间
			}
		},
		methods: {
			// 开始倒计时
			start() {
				if(this.status === 'runing') return
				// 标识为进行中
				this.status = 'runing'
				// 结束时间戳 = 此刻时间戳 + 剩余的时间
				this.endTime = Number(new Date()) + this.remainTime
				
			},
			// 根据是否
			toTick() {
				
			},
			// 清空定时器
			clearTimeout() {
				clearTimeout(this.timer)
				this.timer = null
			}
		},
		beforeDestroy() {
			this.clearTimeout()
		}
	}
</script>

<style lang="scss">

</style>
