<template>
	<view class="u-index-list">
		<slot name="header"></slot>

		<slot name="footer"></slot>
		<view
		    class="u-index-list__letter"
			ref="u-index-list__letter"
		    v-if="showSidebar"
		    @touchstart.stop.prevent="onTouchMove"
		    @touchmove.stop.prevent="onTouchMove"
		    @touchend.stop.prevent="onTouchStop"
		    @touchcancel.stop.prevent="onTouchStop"
		>
			<view
			    class="u-index-list__letter__item"
			    v-for="(item, index) in uIndexList"
			    :key="index"
				:style="{
					backgroundColor: activeIndex === index ? activeColor : 'transparent'
				}"
			>
				<text
				    class="u-index-list__letter__item__index"
				    :style="{color: activeIndex === index ? '#fff' : inactiveColor}"
				    :data-index="index"
				>{{ item }}</text>
			</view>
			<view
				class="u-index-list__indicator"
				:class="['u-index-list__indicator--show']"
				:style="{ top: $u.addUnit(indicatorTop) }"
			>
				<text class="u-index-list__indicator__text">{{ uIndexList[touchmoveIndex] }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const indexList = () => {
		const indexList = [];
		const charCodeOfA = 'A'.charCodeAt(0);
		for (let i = 0; i < 26; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i));
		}
		return indexList;
	}
	import props from './props';
	export default {
		name: 'u-index-list',
		mixins: [uni.$u.mixin, props],
		data() {
			return {
				// 是否显示右侧的索引列表字母，当子组件数量为0时，无需展示
				showSidebar: true,
				// 当前正在被选中的字母索引
				activeIndex: 1,
				touchmoveIndex: 1,
				// 索引字母的信息
				letterInfo: {
					height: 0,
					itemHeight: 0
				},
				// 字母放大指示器的top值，为了让其指向当前激活的字母
				indicatorTop: 0
			}
		},
		computed: {
			// 如果有传入外部的indexList锚点数组则使用，否则使用内部生成A-Z字母
			uIndexList() {
				return this.indexList.length ? this.indexList : indexList()
			}
		},
		watch: {
			uIndexList: {
				immediate: true,
				handler() {
					uni.$u.sleep().then(() => {
						this.setIndexListLetterInfo()
					})
				}
			}
		},
		methods: {
			// 索引列表被触摸
			touchStart(e) {
				// 获取触摸点信息
				const touchStart = e.changedTouches[0]
				if (!startTouch) return
				this.touching = true
				console.log(startTouch.pageY);
				let treeItemCur = this.getCurrentTreeItem(startTouch.pageY)
				this.setValue(treeItemCur)
			},
			/**
			 * tree 触摸移动
			 */
			touchMove(e) {
				// 获取触摸点信息
				let currentTouch = e.changedTouches[0];
				if (!currentTouch) return;
			
				// 滑动结束后迅速开始第二次滑动时候 touching 为 false 造成不显示 indicator 问题
				if (!this.touching) {
					this.touching = true;
				}
			
				let treeItemCur = this.getCurrentTreeItem(currentTouch.pageY);
				this.setValue(treeItemCur);
			},
			/**
			 * tree 触摸结束
			 */
			touchEnd(e) {
				let treeItemCur = this.treeItemCur;
				let listItemCur = this.listItemCur;
				if (treeItemCur !== listItemCur) {
					this.treeItemCur = listItemCur;
					this.indicatorTop = this.indicatorTopList[treeItemCur];
				}
				this.treeKeyTran = true;
				setTimeout(() => {
					this.touching = false;
					this.treeKeyTran = false;
				}, 300);
			},
			// 获取索引列表的尺寸以及单个字符的尺寸信息
			getIndexListLetterRect() {
				return new Promise(resolve => {
					// 延时一定时间，以获取dom尺寸
					// #ifndef APP-NVUE
					this.$uGetRect('.u-index-list__letter').then(size => {
						resolve(size.height)
					})
					// #endif
					
					// #ifdef APP-NVUE
					const ref = this.$refs['u-index-list__letter']
					ref && dom.getComponentRect(ref, res => {
						resolve(res.size.height)
					})
					// #endif
				})
			},
			// 设置indexList索引的尺寸信息
			setIndexListLetterInfo() {
				this.getIndexListLetterRect().then(height => {
					this.letterInfo = {
						height,
						itemHeight: Math.floor(height / this.uIndexList.length)
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";

	.u-index-list {

		&__letter {
			position: fixed;
			right: 0;
			// top: 50%;
			// transform: translateY(-50%);
			text-align: center;
			z-index: 3;
			padding: 0 6px;

			&__item {
				width: 16px;
				height: 16px;
				border-radius: 100px;
				margin: 1px 0;
				@include flex;
				align-items: center;
				justify-content: center;
				
				&--active {
					background-color: $u-error;
				}
				
				&__index {
					font-size: 12px;
					text-align: center;
					line-height: 12px;
				}
			}
		}
		
		&__indicator {
			opacity: 0;
			transition: opacity 0.3s;
			position: fixed;
			right: 50px;
			width: 50px;
			height: 50px;
			border-radius: 100px 100px 0 100px;
			text-align: center;
			color: #ffffff;
			z-index: 10;
			background-color: #c9c9c9;
			transform: rotate(-45deg);
			@include flex;
			justify-content: center;
			align-items: center;
			
			&--show {
				opacity: 1;
				
			}
			
			&__text {
				font-size: 28px;
				line-height: 28px;
				font-weight: bold;
				color: #fff;
				transform: rotate(45deg);
				text-align: center;
			}
		}
	}
</style>
