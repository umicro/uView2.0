<template>
	<u-picker
		:show="show"
		:closeOnClickOverly="closeOnClickOverly"
	>
	</u-picker>
</template>

<script>
	import props from './props.js'
	export default {
		name: 'datetime-picker',
		mixins: [uni.$u.mixin, props],
		data() {
			return {

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.updateColumnValues(this.value)
			},
			// 更新各列的值
			updateColumnValues(value) {
				const innerValue = this.correctValue(value)
			},
			// 得出合法的时间
			correctValue(value) {
				
			}
		},
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
	
	
</style>
