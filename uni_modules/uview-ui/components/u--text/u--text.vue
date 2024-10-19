<template>
    <uvText
        :type="type"
        :show="show"
        :text="text"
        :prefixIcon="prefixIcon"
        :suffixIcon="suffixIcon"
        :mode="mode"
        :href="href"
        :format="format"
        :call="call"
        :openType="openType"
        :bold="bold"
        :block="block"
        :lines="lines"
        :color="color"
		:decoration="decoration"
        :size="size"
        :iconStyle="iconStyle"
        :margin="margin"
        :lineHeight="lineHeight"
        :align="align"
        :wordWrap="wordWrap"
        :customStyle="customStyle"
        @click="$emit('click')"
    ></uvText>
</template>

<script>
/**
 * 此组件存在的理由是，在nvue下，u-text被uni-app官方占用了，u-text在nvue中相当于input组件
 * 所以在nvue下，取名为u--input，内部其实还是u-text.vue，只不过做一层中转
 * 不使用v-bind="$attrs"，而是分开独立写传参，是因为微信小程序不支持此写法
 */
import uvText from "../u-text/u-text.vue";
import props from "../u-text/props.js";
/**
 * Text 文本
 * @description 此组件集成了文本类在项目中的常用功能，包括状态，拨打电话，格式化日期，*替换，超链接...等功能。 您大可不必在使用特殊文本时自己定义，text组件几乎涵盖您能使用的大部分场景。
 * @tutorial https://www.uviewui.com/components/loading.html
 * @property {String} 					type		主题颜色
 * @property {Boolean} 					show		是否显示（默认 true ）
 * @property {String | Number}			text		显示的值
 * @property {String}					prefixIcon	前置图标
 * @property {String} 					suffixIcon	后置图标
 * @property {String} 					mode		文本处理的匹配模式 text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
 * @property {String} 					href		mode=link下，配置的链接
 * @property {String | Function} 		format		格式化规则
 * @property {Boolean} 					call		mode=phone时，点击文本是否拨打电话（默认 false ）
 * @property {String} 					openType	小程序的打开方式
 * @property {Boolean} 					bold		是否粗体，默认normal（默认 false ）
 * @property {Boolean} 					block		是否块状（默认 false ）
 * @property {String | Number} 			lines		文本显示的行数，如果设置，超出此行数，将会显示省略号
 * @property {String} 					color		文本颜色（默认 '#303133' ）
 * @property {String | Number} 			size		字体大小（默认 15 ）
 * @property {Object | String} 			iconStyle	图标的样式 （默认 {fontSize: '15px'} ）
 * @property {String} 					decoration	文字装饰，下划线，中划线等，可选值 none|underline|line-through（默认 'none' ）
 * @property {Object | String | Number}	margin		外边距，对象、字符串，数值形式均可（默认 0 ）
 * @property {String | Number} 			lineHeight	文本行高
 * @property {String} 					align		文本对齐方式，可选值left|center|right（默认 'left' ）
 * @property {String} 					wordWrap	文字换行，可选值break-word|normal|anywhere（默认 'normal' ）
 * @event {Function} click  点击触发事件
 * @example <u--text text="我用十年青春,赴你最后之约"></u--text>
 */
export default {
    name: "u--text",
    mixins: [uni.$u.mpMixin, props, uni.$u.mixin],
    components: {
        uvText,
    },
};
</script>
