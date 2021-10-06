export default {
	props: {
		abcd: {
			type: String,
			default: 'abcd'
		}
	},
	data(){
		return {
			name1: 134
		}
	},
	computed: {
		name2() {
			return 'name2'
		}
	}
}