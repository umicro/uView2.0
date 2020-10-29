<template>
    <view :style="[customStyle]" :class="[customClass]">
        <view v-if="title" class="u-cell-group__title">
            <slot name="title">
				<text class="u-cell-group__title__text">{{ title }}</text>
			</slot>
        </view>
        <view class="u-cell-group" :class="[border ? 'u-cell-group--border' : '']">
			<u-line v-if="border"></u-line>
            <slot />
        </view>
    </view>
</template>

<script>

export default {
    name: 'u-cell-group',
    mixins: [uni.$u.mixin],
    props: {
		// 分组标题
        title: {
            type: String,
            default: uni.$u.props.cell.title
        },
		// 是否显示外边框
        border: {
            type: Boolean,
            default: uni.$u.props.cell.border
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

