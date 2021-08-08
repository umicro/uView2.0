<template>
	<view class="">
		<u-form :model="form" :rules="rules" ref="uForm">
			<view class="">
				<view class="boxtop">
					<view class="">
						家庭成员
					</view>
					<view class="" style="background-color: #2B85E4;width: 35upx;height: 35upx;margin-top: 20upx;"
						@click="add()">
						<!-- + -->
					</view>
				</view>
				<u-form-item label="称谓" prop="appellation">
					<u-input v-model="form.appellation" placeholder="输入称谓" />
				</u-form-item>
				<u-form-item label="姓名" prop="name">
					<u-input v-model="form.name" placeholder="输入姓名" />
				</u-form-item>

				<u-form-item label="工作单位" prop="workUnit">
					<u-input v-model="form.workUnit" placeholder="输入工作单位" />
				</u-form-item>

				<u-form-item label="手机号" prop="mobile">
					<u-input v-model="form.mobile" placeholder="输入手机号" />
				</u-form-item>
			</view>

			<view class="" v-for="(iten,index) in list" :key='index'>
				<view class="boxtop">
					<view class="">
						家庭成员
					</view>
					<view class="" style="background-color: red;width: 35upx;height: 35upx;margin-top: 20upx;"
						@click="deleteList(index)">
						<!-- + -->
					</view>
				</view>
				<u-form-item label="称谓" prop="appellation">
					<u-input v-model="iten.appellation" placeholder="输入称谓" />
				</u-form-item>
				<u-form-item label="姓名" prop="name">
					<u-input v-model="iten.name" placeholder="输入姓名" />
				</u-form-item>

				<u-form-item label="工作单位" prop="workUnit">
					<u-input v-model="iten.workUnit" placeholder="输入工作单位" />
				</u-form-item>

				<u-form-item label="手机号" prop="mobile">
					<u-input v-model="iten.mobile" placeholder="输入手机号" />
				</u-form-item>
			</view>

		</u-form>
		<view class="" style="padding-bottom: 40upx;">
			<u-button type="success" @click="submit"
				style="width: 95%;margin-left: 2.5%;height: 80upx;line-height: 80upx">下一步
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					appellation: '',
					name: '',
					workUnit: '',
					mobile: '',
				},
				list: [],
				familyMemberList: [],
				rules: {
					appellation: [{
						required: true,
						message: '请输入称谓',
						trigger: ['change', 'blur'],
					}],
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur'],
					}],
					workUnit: [{
						required: true,
						message: '请输入工作单位',
						trigger: ['change', 'blur'],
					}],
					mobile: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}],

				}
			};
		},
		onShow() {
			let arr = JSON.parse(sessionStorage.getItem('familyMemberList'))
			if (arr) {
				this.form = arr[0]
				this.list = arr.splice(1)
			}
		},
		methods: {
			// 添加
			add() {
				this.list.push({
					appellation: '',
					name: '',
					workUnit: '',
					mobile: '',
				})
			},
			// 删除
			deleteList(index) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否删除此条数据?',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.list.splice(index, 1)
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},

			submit() {
				let _this = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						console.log('验证通过');

						_this.familyMemberList.unshift(_this.form)
						let arr = _this.familyMemberList.concat(_this.list)

						let cArr = [...new Set(arr)]


						sessionStorage.setItem('familyMemberList', JSON.stringify(cArr))
						console.log(JSON.parse(JSON.stringify(cArr)))
					} else {
						console.log('验证失败');
					}
				});
			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>


<style lang="scss" scoped>
	.boxtop {
		border: 1px solid #E4E7ED;
		height: 88upx;
		line-height: 88upx;
		padding: 0upx 20upx;
		display: flex;
		justify-content: space-between;
	}

	/deep/.u-form-item--left__content__label:before {
		color: #ff0000;
		content: '*'
	}

	.u-form {
		// background-color: #007AFF;
		padding: 20upx;
	}

	.u-form-item {
		border-left: 1px solid #e4e7ed;
		border-right: 1px solid #e4e7ed;
	}

	/deep/.u-form-item__message {
		text-align: right;
	}

	/deep/.uni-input-input {
		text-align: right;
	}

	/deep/.input-placeholder {
		text-align: right;
	}

	/deep/.u-form-item--left__content__label {
		width: 140upx;
	}

	/deep/.u-form-item--right__content__slot {
		display: flex;
		justify-content: flex-end;
		margin-left: 20upx;
	}
</style>
