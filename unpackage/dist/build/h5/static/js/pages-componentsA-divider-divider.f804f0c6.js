(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-componentsA-divider-divider"],{"0dff":function(t,e,i){"use strict";i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uDivider:i("7220").default},u=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"u-page"},[e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("基本案例")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线"}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("是否虚线")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",dashed:!0}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("是否细线")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",hairline:!0}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("是否以点代替文字")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",dot:!0}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("文本内容靠左")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",textPosition:"left"}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("文本内容靠右")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",textPosition:"right"}})],1)],1),e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[this._v("自定义文本颜色")]),e("v-uni-view",[e("u-divider",{attrs:{text:"分割线",textColor:"#2979ff",lineColor:"#2979ff"}})],1)],1)],1)},a=[]},"10cb":function(t,e,i){"use strict";i.r(e);var n=i("1a5b"),u=i("71bd");for(var a in u)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return u[t]}))}(a);i("6feb");var r=i("f0c5"),s=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,"2f0e5305",null,!1,n["a"],void 0);e["default"]=s.exports},"110c":function(t,e,i){var n=i("4b0d");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var u=i("4f06").default;u("3bfe21f8",n,!0,{sourceMap:!1,shadowMode:!1})},"118b":function(t,e,i){"use strict";var n=i("dcab"),u=i.n(n);u.a},"14bd":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */uni-view[data-v-a0cad060], uni-scroll-view[data-v-a0cad060], uni-swiper-item[data-v-a0cad060]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-divider[data-v-a0cad060]{display:flex;flex-direction:row;flex-direction:row;align-items:center;margin:15px 0}.u-divider__text[data-v-a0cad060]{margin:0 15px}.u-divider__dot[data-v-a0cad060]{font-size:12px;margin:0 12px;color:#c0c4cc}',""]),t.exports=e},"1a5b":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return u})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=this._self._c||t;return e("v-uni-view",{staticClass:"u-line",style:[this.lineStyle]})},u=[]},"1b80":function(t,e,i){var n=i("c18f");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var u=i("4f06").default;u("51a0c82d",n,!0,{sourceMap:!1,shadowMode:!1})},2277:function(t,e,i){"use strict";i.r(e);var n=i("dac1"),u=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=u.a},3864:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3");var n={props:{dashed:{type:Boolean,default:uni.$u.props.divider.dashed},hairline:{type:Boolean,default:uni.$u.props.divider.hairline},dot:{type:Boolean,default:uni.$u.props.divider.dot},textPosition:{type:String,default:uni.$u.props.divider.textPosition},text:{type:[String,Number],default:uni.$u.props.divider.text},textSize:{type:[String,Number],default:uni.$u.props.divider.textSize},textColor:{type:String,default:uni.$u.props.divider.textColor},lineColor:{type:String,default:uni.$u.props.divider.lineColor}}};e.default=n},"4b0d":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */uni-view[data-v-2f0e5305], uni-scroll-view[data-v-2f0e5305], uni-swiper-item[data-v-2f0e5305]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-line[data-v-2f0e5305]{vertical-align:middle}',""]),t.exports=e},"4e0ce":function(t,e,i){"use strict";i.r(e);var n=i("0dff"),u=i("2277");for(var a in u)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return u[t]}))}(a);i("6f8e");var r=i("f0c5"),s=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,"bc4de12c",null,!1,n["a"],void 0);e["default"]=s.exports},"62aa":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=n(i("3864")),a={name:"u-divider",mixins:[uni.$u.mpMixin,uni.$u.mixin,u.default],computed:{textStyle:function(){var t={};return t.fontSize=uni.$u.addUnit(this.textSize),t.color=this.textColor,t},leftLineStyle:function(){var t={};return"left"===this.textPosition?t.width="80rpx":t.flex=1,t},rightLineStyle:function(){var t={};return"right"===this.textPosition?t.width="80rpx":t.flex=1,t}},methods:{click:function(){this.$emit("click")}}};e.default=a},"6f8e":function(t,e,i){"use strict";var n=i("1b80"),u=i.n(n);u.a},"6feb":function(t,e,i){"use strict";var n=i("110c"),u=i.n(n);u.a},"71bd":function(t,e,i){"use strict";i.r(e);var n=i("85cc"),u=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=u.a},7220:function(t,e,i){"use strict";i.r(e);var n=i("7753"),u=i("9c34");for(var a in u)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return u[t]}))}(a);i("118b");var r=i("f0c5"),s=Object(r["a"])(u["default"],n["b"],n["c"],!1,null,"a0cad060",null,!1,n["a"],void 0);e["default"]=s.exports},7753:function(t,e,i){"use strict";i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return n}));var n={uLine:i("10cb").default},u=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"u-divider",style:[t.$u.addStyle(t.customStyle)],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.click.apply(void 0,arguments)}}},[i("u-line",{attrs:{color:t.lineColor,customStyle:t.leftLineStyle,hairline:t.hairline,dashed:t.dashed}}),t.dot?i("v-uni-text",{staticClass:"u-divider__dot"},[t._v("●")]):t.text?i("v-uni-text",{staticClass:"u-divider__text",style:[t.textStyle]},[t._v(t._s(t.text))]):t._e(),i("u-line",{attrs:{color:t.lineColor,customStyle:t.rightLineStyle,hairline:t.hairline,dashed:t.dashed}})],1)},a=[]},"85cc":function(t,e,i){"use strict";i("7a82");var n=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=n(i("92b0")),a={name:"u-line",mixins:[uni.$u.mpMixin,uni.$u.mixin,u.default],computed:{lineStyle:function(){var t={};return t.margin=this.margin,"row"===this.direction?(t.borderBottomWidth="1px",t.borderBottomStyle=this.dashed?"dashed":"solid",t.width=uni.$u.addUnit(this.length),this.hairline&&(t.transform="scaleY(0.5)")):(t.borderLeftWidth="1px",t.borderLeftStyle=this.dashed?"dashed":"solid",t.height=uni.$u.addUnit(this.length),this.hairline&&(t.transform="scaleX(0.5)")),t.borderColor=this.color,uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}}};e.default=a},"92b0":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("a9e3");var n={props:{color:{type:String,default:uni.$u.props.line.color},length:{type:[String,Number],default:uni.$u.props.line.length},direction:{type:String,default:uni.$u.props.line.direction},hairline:{type:Boolean,default:uni.$u.props.line.hairline},margin:{type:[String,Number],default:uni.$u.props.line.margin},dashed:{type:Boolean,default:uni.$u.props.line.dashed}}};e.default=n},"9c34":function(t,e,i){"use strict";i.r(e);var n=i("62aa"),u=i.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(a);e["default"]=u.a},c18f:function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */',""]),t.exports=e},dac1:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={data:function(){return{}},methods:{}}},dcab:function(t,e,i){var n=i("14bd");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var u=i("4f06").default;u("0d339d00",n,!0,{sourceMap:!1,shadowMode:!1})}}]);