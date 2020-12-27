<template>
	<view class="u-upload">
		<view class="u-upload__wrap">
			<view
			    class="u-upload__wrap__preview"
			    v-for="(item, index) in lists"
			    :key="index"
			>
				<image
				    v-if="item.isImage"
				    :src="item.thumb || item.url"
				    class="u-upload__wrap__preview__image"
				/>
				<view
				    v-else
				    class="u-upload__wrap__preview__file"
				>
					<u-icon name="map"></u-icon>
				</view>
				<view
				    class="u-upload__status"
				    v-if="item.status === 'uploading' || item.status === 'failed'"
				>
					<van-icon
					    v-if="item.status === 'failed'"
					    name="close"
					    class="u-upload__status__icon"
					/>
					<u-loading-icon v-else />
					<text
					    v-if="item.message"
					    class="u-upload__status__message"
					>{{ item.message }}</text>
				</view>
				<view
				    class="u-upload__deletable"
				    v-if="deletable || item.deletable"
				>
					<u-icon name="delete"></u-icon>
				</view>
			</view>
		</view>
		<slot v-if="isInCount">
			<view class="u-upload__button">
				<u-icon name="upload"></u-icon>
				<text
				    v-if="uploadText"
				    class="u-upload__button__text"
				>{{ uploadText }}</text>
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';
	
	
</style>
