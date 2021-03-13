<template>
	<view class="u-page">
		<u-list
			ref="list"
			customStyle="height: 400px"
			@scrolltolower="scrolltolower"
		>
			<u-list-item
				v-for="(item, index) in indexList"
				:key="index"
				:id="index"
			>
				<u-cell
					:title="`列表长度-${index + 1}`"
				>
					<u-avatar
						slot="icon"
						shape="square"
						size="35"
						:src="item.url"
						customStyle="margin: -3px 5px -3px 0"
					></u-avatar>
				</u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	const indexList = () => {
		const indexList = []
		const charCodeOfA = 'A'.charCodeAt(0)
		for (let i = 0; i < 13; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i))
		}
		return indexList
	}
	export default {
		data() {
			return {
				indexList: [],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
					'https://cdn.uviewui.com/uview/album/4.jpg',
					'https://cdn.uviewui.com/uview/album/5.jpg',
					'https://cdn.uviewui.com/uview/album/6.jpg',
					'https://cdn.uviewui.com/uview/album/7.jpg',
					'https://cdn.uviewui.com/uview/album/8.jpg',
					'https://cdn.uviewui.com/uview/album/9.jpg',
					'https://cdn.uviewui.com/uview/album/10.jpg',
				],
				names: ["勇往无敌", "疯狂的迪飙", "磊爱可", "梦幻梦幻梦", "枫中飘瓢", "飞翔天使",
					"曾经第一", "追风幻影族长", "麦小姐", "胡格罗雅", "Red磊磊", "乐乐立立", "青龙爆风", "跑跑卡叮车", "山里狼", "supersonic超"
				]
			}
		},
		computed: {
			itemArr() {
				return this.indexList.map(item => {
					const arr = []
					for (let i = 0; i < 100; i++) {
						arr.push({
							name: this.names[uni.$u.random(0, this.names.length - 1)],
							url: this.urls[uni.$u.random(0, this.urls.length - 1)]
						})
					}
					return arr
				})
			}
		},
		onLoad() {
			// uni.$u.sleep(3000).then(() => {
			// 	this.$refs.list.scrollIntoViewId('30')
			// })
			this.loadmore()
		},
		methods: {
			scrolltolower() {
				this.loadmore()
			},
			loadmore() {
				for (let i = 0; i < 50; i++) {
					this.indexList.push({
						name: this.names[uni.$u.random(0, this.names.length - 1)],
						url: this.urls[uni.$u.random(0, this.urls.length - 1)]
					})
				}
			}
		},
	}
</script>

<style lang="scss">
	.u-page {
		padding-top: 0;
	}
</style>
