<template>
	<view class="u-tabs">
		<u-sticky>
			<view class="u-tabs__wrapper">
				<slot name="left" />
				<scroll-view
				    :scroll-x="scrollable"
				    :scroll-left="scrollLeft"
				>
					<view class="u-tabs__nav">
						<view
						    class="u-tabs__nav__item"
						    v-for="(item, index) in list"
						    :key="index"
						    @tap="clickHandler"
						    :ref="`u-tabs__nav__item-${index}`"
						    :class="[`u-tabs__nav__item-${index}`]"
						>
							<u-badge :value="1">
								<text
								    :class="['ellipsis' && 'u-line-1']"
								    class="u-tabs__nav__item__text"
								>{{ item.name }}</text>
							</u-badge>
						</view>
						<view class="u-tabs__nav__line">

						</view>
					</view>
				</scroll-view>
				<slot name="right" />
			</view>
		</u-sticky>
	</view>
</template>

<script>
	// #ifdef APP-NVUE
	const animation = uni.requireNativePlugin('animation')
	const dom = uni.requireNativePlugin('dom')
	// #endif
	export default {
		name: 'u-tabs',
		mixins: [uni.$u.mixin],
		data() {
			return {
				scrollLeft: 0,
				scrollable: true,
				list: [{
					name: '标签1',
					react: {}
				}, {
					name: '标签2',
					react: {}
				}, {
					name: '标签3',
					react: {}
				}, {
					name: '标签4',
					react: {}
				}, {
					name: '标签5',
					react: {}
				}, {
					name: '标签6',
					react: {}
				}, {
					name: '标签7',
					react: {}
				}, {
					name: '标签8',
					react: {}
				}, {
					name: '标签9',
					react: {}
				}],
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			// 点击某一个标签
			clickHandler(index) {

			},
			init() {
				this.getListItemRect()
			},
			// 获取所有标签的尺寸
			getListItemRect() {
				// 故意写成你看不懂的样子
				uni.$u.sleep().then(() => {
					Promise.all(this.list.map((item, index) => this.queryReact(`u-tabs__nav__item-${index}`))).then(sizes => {
						
					})
				})
			},
			// 获取各个标签的尺寸
			queryReact(el) {
				// #ifndef APP-NVUE
				// $uGetRect为uView自带的节点查询简化方法，详见文档介绍：https://www.uviewui.com/js/getRect.html
				// 组件内部一般用this.$uGetRect，对外的为this.$u.getRect，二者功能一致，名称不同
				return new Promise(resolve => {
					this.$uGetRect(`.${el}`, true).then(size => {
						resolve(size)
					})
				})
				// #endif

				// #ifdef APP-NVUE
				// nvue下，使用dom模块查询元素高度
				// 返回一个promise，让调用此方法的主体能使用then回调
				return new Promise(resolve => {
					dom.getComponentRect(this.$refs[el][0], res => {
						console.log(res);
						resolve(res.size)
					})
				})
				// #endif
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-tabs {

		&__nav {
			@include flex;
			height: 45px;
			position: relative;

			&__item {
				padding: 0 5px;
				@include flex;
				align-items: center;

				&__text {
					font-size: 14px;
					color: $u-content-color;
				}
			}

			&__line {
				height: 3px;
				background-color: $u-primary;
				width: 30px;
				left: 100px;
				position: absolute;
				bottom: 0;
				border-radius: 100px;
			}
		}
	}
</style>
