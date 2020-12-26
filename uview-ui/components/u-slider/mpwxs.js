export default {
	data() {
		return {
			sliderRect: {}
		}
	},
	mounted() {
		this.init()
	},
	computed: {
		info() {
			return {
				width: this.sliderRect.width,
				left: this.sliderRect.left,
				step: this.step,
				disabled: this.disabled,
				min: this.min,
				max: this.max,
				value: this.value
			}
		}
	},
	methods: {
		init() {
			this.getSliderRect()
		},
		// 获取slider尺寸
		getSliderRect() {
			// 获取滑块条的尺寸信息
			setTimeout(() => {
				this.$uGetRect('.u-slider').then(rect => {
					this.sliderRect = rect
				})
			}, 10)
		},
		// 此方法由wxs调用，用于修改v-model绑定的值
		updateValue(value) {
			this.$emit('input', value)
		},
		// 此方法由wxs调用，发出事件
		emitEvent(e) {
			this.$emit(e.event, e.value ? e.value : this.value)
		},
	}
}