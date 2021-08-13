<template>
	<view class="nav-wrap">
		<view class="nav-title">
			<image class="logo" src="https://cdn.uviewui.com/uview/common/logo.png" mode="widthFix"></image>
			<view class="nav-info">
				<text class="nav-title__text">uView UI 2.0（内测）</text>
				<text class="nav-slogan">内测版本不代表最终品质</text>
			</view>
		</view>
		<text class="nav-desc">{{desc}}</text>
		<!-- <view class="lang" @tap="switchLang">
			<u-icon size="46" color="warning" :name="lang"></u-icon>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			desc: String,
			title: String,
		},
		computed: {
			// lang() {
			// 	return this.$i18n.locale == 'zh' ? 'zh' : 'en';
			// }
		},
		methods: {
			switchLang() {
				// this.$i18n.locale = this.$i18n.locale == 'en' ? 'zh' : 'en';
				// this.vuex_tabbar[0].text = this.$t('nav.components')
				// this.vuex_tabbar[1].text = this.$t('nav.js')
				// this.vuex_tabbar[2].text = this.$t('nav.template')
				// uni.setNavigationBarTitle({
				// 	title: this.$t(this.title)
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-wrap {
		padding: 15px;
		position: relative;
	}
	
	.lang {
		position: absolute;
		top: 15px;
		right: 15px;
	}
	
	.nav-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	
	.nav-info {
		margin-left: 15px;
	}
	
	.nav-title__text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		color: $u-main-color;
		font-size: 25px;
		font-weight: bold;
	}
	
	.logo {
		width: 70px;
		height: 70px;
		/* #ifndef APP-NVUE */
		height: auto;
		/* #endif */
	}
	
	.nav-slogan {
		color: $u-tips-color;
		font-size: 14px;
	}
	
	.nav-desc {
		margin-top: 10px;
		font-size: 14px;
		color: $u-content-color;
		line-height: 20px;
	}
</style>
