<template>
	<view class="u-upload">
		<view class="u-upload__wrap">
			<view
			    class="u-upload__wrap__preview"
			    v-for="(item, index) in lists"
			    :key="index"
			>
				<image
				    v-if="item.isImage || (item.type && item.type === 'image')"
				    :src="item.thumb || item.url"
				    mode="aspectFill"
				    class="u-upload__wrap__preview__image"
				    @tap="onPreviewImage(item)"
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
					<view class="u-upload__status__icon">
						<u-icon
						    v-if="item.status === 'failed'"
						    name="close-circle"
						    color="#ffffff"
						    size="25"
						/>
						<u-loading-icon
						    size="22"
						    mode="circle"
						    color="#ffffff"
						    v-else
						/>
					</view>
					<text
					    v-if="item.message"
					    class="u-upload__status__message"
					>{{ item.message }}</text>
				</view>
				<view
				    class="u-upload__deletable"
				    v-if="item.status !== 'uploading' && (deletable || item.deletable)"
					@tap.stop="deleteItem(index)"
				>
					<view class="u-upload__deletable__icon">
						<u-icon
						    name="close"
						    color="#ffffff"
						    size="10"
						></u-icon>
					</view>
				</view>
				<view
				    class="u-upload__success"
				    v-if="item.status === 'success'"
				>
					<!-- #ifdef APP-NVUE -->
					<image
					    :src="successIcon"
					    class="u-upload__success__icon"
					></image>
					<!-- #endif -->
					<!-- #ifndef APP-NVUE -->
					<view class="u-upload__success__icon">
						<u-icon
						    name="checkmark"
						    color="#ffffff"
						    size="12"
						></u-icon>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<slot v-if="isInCount">
			<view
			    class="u-upload__button"
			    hover-class="u-upload__button--hover"
			    hover-stay-time="150"
			    @tap="chooseFile"
			>
				<u-icon
				    :name="uploadIcon"
				    size="25"
				    color="#dcdee0"
				></u-icon>
				<text
				    v-if="uploadText"
				    class="u-upload__button__text"
				>{{ uploadText }}</text>
			</view>
		</slot>
	</view>
</template>

<script>
	import {
		chooseFile
	} from './utils';
	export default {
		props: {
			// 接受的文件类型, 可选值为all media image file video
			accept: {
				type: String,
				default: 'image',
			},
			capture: {
				type: [String, Array],
				default () {
					return ['album', 'camera']
				}
			},
			// 当accept为video时生效，是否压缩视频，默认为true
			compressed: {
				type: Boolean,
				default: true
			},
			// 当accept为video时生效，可选值为back或front
			camera: {
				type: String,
				default: 'back'
			},
			// 当accept为video时生效，拍摄视频最长拍摄时间，单位秒
			maxDuration: {
				type: Number,
				value: 60,
			},
			// 上传区域的图标，只能内置图标
			uploadIcon: {
				type: String,
				default: 'camera-fill'
			},
			useBeforeRead: {
				type: Boolean,
				default: false
			},
			afterRead: {
				type: Function,
				default() {
					return null
				}
			},
			beforeRead: {
				type: Function,
				default() {
					return null
				}
			},
			//是否显示组件自带的图片预览功能
			showUploadList: {
				type: Boolean,
				default: true
			},
			// 后端地址
			action: {
				type: String,
				default: ''
			},
			// 最大上传数量
			maxCount: {
				type: [String, Number],
				default: 52
			},
			//  是否显示进度条
			showProgress: {
				type: Boolean,
				default: true
			},
			// 是否启用
			disabled: {
				type: Boolean,
				default: false
			},
			// 预览上传的图片时的裁剪模式，和image组件mode属性一致
			imageMode: {
				type: String,
				default: 'aspectFill'
			},
			// 头部信息
			header: {
				type: Object,
				default () {
					return {};
				}
			},
			// 额外携带的参数
			formData: {
				type: Object,
				default () {
					return {};
				}
			},
			// 标识符，可以在回调函数的第二项参数中获取
			name: {
				type: String,
				default: ''
			},
			// 所选的图片的尺寸, 可选值为original compressed
			sizeType: {
				type: Array,
				default () {
					return ['original', 'compressed'];
				}
			},
			sourceType: {
				type: Array,
				default () {
					return ['album', 'camera'];
				}
			},
			// 是否在点击预览图后展示全屏图片预览
			previewFullImage: {
				type: Boolean,
				default: true
			},
			// 是否开启图片多选，部分安卓机型不支持
			multiple: {
				type: Boolean,
				default: false
			},
			// 是否展示删除按钮
			deletable: {
				type: Boolean,
				default: true
			},
			// 文件大小限制，单位为byte
			maxSize: {
				type: [String, Number],
				default: Number.MAX_VALUE
			},
			// 显示已上传的文件列表
			fileList: {
				type: Array,
				default () {
					return [];
				}
			},
			// 上传区域的提示文字
			uploadText: {
				type: String,
				default: ''
			},
			// 是否自动上传
			autoUpload: {
				type: Boolean,
				default: true
			},
			// 是否显示toast消息提示
			showTips: {
				type: Boolean,
				default: true
			},
			// 是否通过slot自定义传入选择图标的按钮
			customBtn: {
				type: Boolean,
				default: false
			},
			// 内部预览图片区域和选择图片按钮的区域宽度
			width: {
				type: [String, Number],
				default: 200
			},
			// 内部预览图片区域和选择图片按钮的区域高度
			height: {
				type: [String, Number],
				default: 200
			},
			// 右上角关闭按钮的背景颜色
			delBgColor: {
				type: String,
				default: '#fa3534'
			},
			// 右上角关闭按钮的叉号图标的颜色
			delColor: {
				type: String,
				default: '#ffffff'
			},
			// 右上角删除图标名称，只能为uView内置图标
			delIcon: {
				type: String,
				default: 'close'
			},
			// 如果上传后的返回值为json字符串，是否自动转json
			toJson: {
				type: Boolean,
				default: true
			},
			// 上传前的钩子，每个文件上传前都会执行
			beforeUpload: {
				type: Function,
				default: null
			},
			// 移除文件前的钩子
			beforeRemove: {
				type: Function,
				default: null
			},
			// 允许上传的图片后缀
			limitType: {
				type: Array,
				default () {
					// 支付宝小程序真机选择图片的后缀为"image"
					// https://opendocs.alipay.com/mini/api/media-image
					return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'];
				}
			},
			// 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
			index: {
				type: [Number, String],
				default: ''
			}
		},
		data() {
			return {
				// #ifdef APP-NVUE
				successIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAKKADAAQAAAABAAAAKAAAAAB65masAAACP0lEQVRYCc3YXygsURwH8K/dpcWyG3LF5u/6/+dKVylSypuUl6uUPMifKMWL8oKEB1EUT1KeUPdR3uTNUsSLxb2udG/cbvInNuvf2rVnazZ/ZndmZ87snjM1Z+Z3zpzfp9+Z5mEAhlvjRtZgCKs+gnPAOcAkkMOR4jEHfItjDvgRxxSQD8cM0BuOCaAvXNCBQrigAsXgggYUiwsK0B9cwIH+4gIKlIILGFAqLiBAOTjFgXJxigJp4BQD0sIpAqSJow6kjSNAFTnRaHJwLenD6Mud52VQAcrBfTd2oyq+HtGaGGWAcnAVcXWoM3bCZrdi+ncPfaAcXE5UKVpdW/vitGPqqAtn98d0gXJwX7Qp6MmegUYVhvmTIezdmHlxJCjpHRTCFerLkRRu4k0aqdajN3sWOo0BK//msHa+xDuPC/oNFMKRhTtM4xjIX0SCNpXL4+7VIaHuyiWEp2L7ahWLf8fejfPdqPmC3mJicORZUp1CQzm+GiphvljGk+PBvWRbxii+xVTj5M6CiZ/tsDufvaXyxEUDxeLIyvu3m0iOyEFWVAkydcVYdyFrE9tQk9iMq6f/GNlvwt3LjQfh60LUrw9/cFyyMJUW/XkLSNMV4Mi6C5ML+ui4x5ClAX9sB9w0wV6wglJwJCv5fOxcr6EstgbGiEw4XcfUry4cWrcEUW8n+ARKxXEJHhw2WG43UKSvwI/TSZgvl7kh0b3XLZaLEy0QmMgLZAVH7J+ALOE+AVnDvQOyiPMAWcW5gSzjCPAV+78S5WE0GrQAAAAASUVORK5CYII=',
				// #endif
				lists: [],
				isInCount: true,
			}
		},
		watch: {
			fileList: {
				immediate: true,
				handler() {
					this.formatFileList()
				}
			}
		},
		methods: {
			formatFileList() {
			    const {
			        fileList = [], maxCount
			    } = this;
			    const lists = fileList.map((item) =>
			        Object.assign(Object.assign({}, item), {
			            isImage: uni.$u.test.image(item.url),
			            isVideo: uni.$u.test.video(item.url),
			            deletable: typeof(item.deletable) === 'boolean' ? item.deletable : true,
			        })
			    );
				this.lists = lists
				this.isInCount = lists.length < maxCount
			},
			chooseFile() {
				const {
					maxCount,
					multiple,
					lists,
					disabled
				} = this;
				if (disabled) return;
				chooseFile(
						Object.assign({
							accept: this.accept,
							multiple: this.multiple,
							capture: this.capture,
							compressed: this.compressed,
							maxDuration: this.maxDuration,
							sizeType: this.sizeType,
							camera: this.camera,
						}, {
							maxCount: maxCount - lists.length,
						})
					)
					.then((res) => {
						this.onBeforeRead(multiple ? res : res[0]);
					})
					.catch((error) => {
						this.$emit('error', error);
					});
			},
			// 文件读取之前
			onBeforeRead(file) {
				const {
					beforeRead,
					useBeforeRead,
				} = this;
				let res = true
				// beforeRead是否为一个方法
				if (uni.$u.test.func(beforeRead)) {
					// 如果用户定义了此方法，则去执行此方法，并传入读取的文件回调
					res = beforeRead(file, this.getDetail());
				}
				if (useBeforeRead) {
					res = new Promise((resolve, reject) => {
						this.$emit(
							'before-read',
							Object.assign(Object.assign({
								file
							}, this.getDetail()), {
								callback: (ok) => {
									ok ? resolve() : reject();
								},
							})
						);
					});
				}
				if (!res) {
					return;
				}
				if (uni.$u.test.promise(res)) {
					res.then((data) => this.onAfterRead(data || file));
				} else {
					this.onAfterRead(file);
				}
			},
			getDetail(index) {
				return {
					name: this.name,
					index: index == null ? this.fileList.length : index,
				};
			},
			onAfterRead(file) {
				const {
					maxSize,
					afterRead
				} = this;
				const oversize = Array.isArray(file) ?
					file.some((item) => item.size > maxSize) :
					file.size > maxSize;
				if (oversize) {
					this.$emit('oversize', Object.assign({
						file
					}, this.getDetail()));
					return;
				}
				if (typeof afterRead === 'function') {
					afterRead(file, this.getDetail());
				}
				this.$emit('afterRead', Object.assign({
					file
				}, this.getDetail()));
			},
			deleteItem(index) {
				this.$emit(
					'delete',
					Object.assign(Object.assign({}, this.getDetail(index)), {
						file: this.fileList[index],
					})
				);
			},
			// 预览图片
			onPreviewImage(item) {
				if (!item.isImage || !this.previewFullImage) return
				uni.previewImage({
					// 先filter找出为图片的item，再返回filter结果中的图片url
					urls: this.lists.filter((item) => uni.$u.test.image(item.url)).map((item) => item.url),
					current: item.url,
					fail() {
						uni.$u.toast('预览图片失败')
					},
				});
			},
			onPreviewVideo(event) {
				if (!this.data.previewFullImage) return;
				const {
					index
				} = event.currentTarget.dataset;
				const {
					lists
				} = this.data;
				wx.previewMedia({
					sources: lists
						.filter((item) => isVideoFile(item))
						.map((item) =>
							Object.assign(Object.assign({}, item), {
								type: 'video'
							})
						),
					current: index,
					fail() {
						wx.showToast({
							title: '预览视频失败',
							icon: 'none'
						});
					},
				});
			},
			onClickPreview(event) {
				const {
					index
				} = event.currentTarget.dataset;
				const item = this.data.lists[index];
				this.$emit(
					'click-preview',
					Object.assign(Object.assign({}, item), this.getDetail(index))
				);
			}
		}
	}
</script>

<style lang="scss">
	@import '../../libs/css/components.scss';

	.u-upload {
		@include flex;

		&__wrap {
			@include flex;

			&__preview {
				width: 80px;
				height: 80px;
				border-radius: 3px;
				margin: 0 8px 8px 0;
				position: relative;
				border-radius: 2px;
				overflow: hidden;

				&__image {
					width: 80px;
					height: 80px;
				}
			}
		}

		&__deletable {
			position: absolute;
			top: 0;
			right: 0;
			background-color: rgb(55, 55, 55);
			height: 14px;
			width: 14px;
			@include flex;
			border-bottom-left-radius: 100px;
			align-items: center;
			justify-content: center;
			z-index: 3;

			&__icon {
				position: absolute;
				transform: scale(0.7);
				top: 0px;
				right: 0px;
				/* #ifdef H5 */
				top: 1px;
				right: 0;
				/* #endif */
			}
		}

		&__success {
			position: absolute;
			bottom: 0;
			right: 0;
			@include flex;
			// 由于weex(nvue)为阿里巴巴的KPI(部门业绩考核)的产物，不支持css绘制三角形
			// 所以在nvue下使用图片，非nvue下使用css实现
			/* #ifndef APP-NVUE */
			border-top-color: transparent;
			border-left-color: transparent;
			border-bottom-color: $u-success;
			border-right-color: $u-success;
			border-width: 9px;
			align-items: center;
			justify-content: center;
			/* #endif */

			&__icon {
				/* #ifndef APP-NVUE */
				position: absolute;
				transform: scale(0.7);
				bottom: -10px;
				right: -10px;
				/* #endif */
				/* #ifdef APP-NVUE */
				width: 16px;
				height: 16px;
				/* #endif */
			}
		}

		&__status {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, 0.5);
			@include flex(column);
			align-items: center;
			justify-content: center;

			&__icon {
				position: relative;
				z-index: 1;
			}

			&__message {
				font-size: 12px;
				color: #FFFFFF;
				margin-top: 5px;
			}
		}

		&__button {
			@include flex(column);
			align-items: center;
			justify-content: center;
			width: 80px;
			height: 80px;
			background-color: #f7f8fa;
			border-radius: 2px;
			margin: 0 8px 8px 0;
			/* #ifndef APP-NVUE */
			box-sizing: border-box;
			/* #endif */

			&--hover {
				background-color: rgb(242, 243, 245);
			}
		}
	}
</style>
