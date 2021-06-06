<template>
    <view :style="[$u.addStyle(customStyle)]" :class="[customClass]">
        <view v-if="title" class="u-cell-group__title">
            <slot name="title">
				<text class="u-cell-group__title__text">{{ title }}</text>
			</slot>
        </view>
        <view class="u-cell-group">
			<u-line v-if="border"></u-line>
            <slot />
        </view>
    </view>
</template>

<script>
	/**
	 * cellGroup  单元格
	 * @description cell单元格一般用于一组列表的情况，比如个人中心页，设置页等。
	 * @tutorial https://uviewui.com/components/cell.html
	 * @property {String} title  分组标题
	 * @property {Boolean} border  是否显示外边框
	 * @property {Object} customStyle  定义需要用到的外部样式
	 * @event {Function} click 	点击cell列表时触发
	 * @example <u-cell-group title="设置喜好">
	 */
export default {
    name: 'u-cell-group',
    mixins: [uni.$u.mixin],
    props: {
		// 分组标题
        title: {
            type: String,
            default: uni.$u.props.cellGroup.title
        },
		// 是否显示外边框
        border: {
            type: Boolean,
            default: uni.$u.props.cellGroup.border
        }
    }
}
</script>

<style lang="scss">
	@import "../../libs/css/components.scss";
	
	$u-cell-group-title-padding: 16px 16px 8px !default;
	$u-cell-group-title-font-size: 15px !default;
	$u-cell-group-title-line-height: 16px !default;
	$u-cell-group-title-color: $u-main-color !default;

    .u-cell-group {
        position: relative;
        &__title {
            padding: $u-cell-group-title-padding;

            &__text {
                font-size: $u-cell-group-title-font-size;
                line-height: $u-cell-group-title-line-height;
                color: $u-cell-group-title-color;
            }
        }
    }
</style>

