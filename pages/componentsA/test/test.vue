<template>
	<view>
		<view v-for="i in 30" :key="i" style="height: 5vh">这是一行内容 {{ i }}</view>
		<view>
			<u-button @click="show = true">弹窗</u-button>
		</view>
		<u-popup
			:show="show"
			height="30%"
			mode="bottom"
		>
			向下滑动试试
		</u-popup>
	</view>
</template>

<script>
export default {
	name: "popup",
	data() {
		return {
			show: false
		}
	}
}
</script>

<style scoped>

</style>
