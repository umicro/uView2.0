(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-componentsA-backtop-backtop"],{"07e1":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */uni-view[data-v-3ff6506a], uni-scroll-view[data-v-3ff6506a], uni-swiper-item[data-v-3ff6506a]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}.u-back-top[data-v-3ff6506a]{display:flex;flex-direction:row;flex-direction:column;align-items:center;flex:1;height:100%;justify-content:center;background-color:#e1e1e1}.u-back-top__tips[data-v-3ff6506a]{font-size:12px;-webkit-transform:scale(.8);transform:scale(.8)}',""]),t.exports=a},"0e7f":function(t,a,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("8451")),o={name:"u-back-top",mixins:[uni.$u.mpMixin,uni.$u.mixin,r.default],computed:{backTopStyle:function(){var t={bottom:uni.$u.addUnit(this.bottom),right:uni.$u.addUnit(this.right),width:"40px",height:"40px",position:"fixed",zIndex:10};return t},show:function(){return uni.$u.getPx(this.scrollTop)>uni.$u.getPx(this.top)},contentStyle:function(){var t={},a=0;return a="circle"===this.mode?"100px":"4px",t.borderTopLeftRadius=a,t.borderTopRightRadius=a,t.borderBottomLeftRadius=a,t.borderBottomRightRadius=a,uni.$u.deepMerge(t,uni.$u.addStyle(this.customStyle))}},methods:{backToTop:function(){uni.pageScrollTo({scrollTop:0,duration:this.duration}),this.$emit("click")}}};a.default=o},"23cd":function(t,a,e){"use strict";e.d(a,"b",(function(){return n})),e.d(a,"c",(function(){return r})),e.d(a,"a",(function(){}));var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.inited?e("v-uni-view",{ref:"u-transition",staticClass:"u-transition",class:t.classes,style:[t.mergeStyle],on:{touchmove:function(a){arguments[0]=a=t.$handleEvent(a),t.noop.apply(void 0,arguments)},click:function(a){arguments[0]=a=t.$handleEvent(a),t.clickHandler.apply(void 0,arguments)}}},[t._t("default")],2):t._e()},r=[]},"2c9e":function(t,a,e){"use strict";e.r(a);var n=e("0e7f"),r=e.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=r.a},"2e40":function(t,a,e){var n=e("52c8");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("0a5279b8",n,!0,{sourceMap:!1,shadowMode:!1})},"4a08":function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return n}));var n={uTransition:e("b676").default,uIcon:e("3130").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("u-transition",{attrs:{mode:"fade",customStyle:t.backTopStyle,show:t.show}},[t.$slots.default||t.$slots.$default?t._t("default"):e("v-uni-view",{staticClass:"u-back-top",style:[t.contentStyle],on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.backToTop.apply(void 0,arguments)}}},[e("u-icon",{attrs:{name:t.icon,"custom-style":t.iconStyle}}),t.text?e("v-uni-text",{staticClass:"u-back-top__text"},[t._v(t._s(t.text))]):t._e()],1)],2)},o=[]},"51d6":function(t,a,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("c7eb")),o=n(e("1da1"));e("d3b7"),e("99af");n(e("aa1e"));var i=function(t){return{enter:"u-".concat(t,"-enter u-").concat(t,"-enter-active"),"enter-to":"u-".concat(t,"-enter-to u-").concat(t,"-enter-active"),leave:"u-".concat(t,"-leave u-").concat(t,"-leave-active"),"leave-to":"u-".concat(t,"-leave-to u-").concat(t,"-leave-active")}},s={methods:{clickHandler:function(){this.$emit("click")},vueEnter:function(){var t=this,a=i(this.mode);this.status="enter",this.$emit("beforeEnter"),this.inited=!0,this.display=!0,this.classes=a.enter,this.$nextTick((0,o.default)((0,r.default)().mark((function e(){return(0,r.default)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,uni.$u.sleep(20);case 2:t.$emit("enter"),t.transitionEnded=!1,t.$emit("afterEnter"),t.classes=a["enter-to"];case 6:case"end":return e.stop()}}),e)}))))},vueLeave:function(){var t=this;if(this.display){var a=i(this.mode);this.status="leave",this.$emit("beforeLeave"),this.classes=a.leave,this.$nextTick((function(){t.transitionEnded=!1,t.$emit("leave"),setTimeout(t.onTransitionEnd,t.duration),t.classes=a["leave-to"]}))}},onTransitionEnd:function(){this.transitionEnded||(this.transitionEnded=!0,this.$emit("leave"===this.status?"afterLeave":"afterEnter"),!this.show&&this.display&&(this.display=!1,this.inited=!1))}}};a.default=s},"52c8":function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */uni-view[data-v-a75f7a08], uni-scroll-view[data-v-a75f7a08], uni-swiper-item[data-v-a75f7a08]{display:flex;flex-direction:column;flex-shrink:0;flex-grow:0;flex-basis:auto;align-items:stretch;align-content:flex-start}\r\n/**\r\n * vue版本动画内置的动画模式有如下：\r\n * fade：淡入\r\n * zoom：缩放\r\n * fade-zoom：缩放淡入\r\n * fade-up：上滑淡入\r\n * fade-down：下滑淡入\r\n * fade-left：左滑淡入\r\n * fade-right：右滑淡入\r\n * slide-up：上滑进入\r\n * slide-down：下滑进入\r\n * slide-left：左滑进入\r\n * slide-right：右滑进入\r\n */.u-fade-enter-active[data-v-a75f7a08],\r\n.u-fade-leave-active[data-v-a75f7a08]{transition-property:opacity}.u-fade-enter[data-v-a75f7a08],\r\n.u-fade-leave-to[data-v-a75f7a08]{opacity:0}.u-fade-zoom-enter[data-v-a75f7a08],\r\n.u-fade-zoom-leave-to[data-v-a75f7a08]{-webkit-transform:scale(.95);transform:scale(.95);opacity:0}.u-fade-zoom-enter-active[data-v-a75f7a08],\r\n.u-fade-zoom-leave-active[data-v-a75f7a08]{transition-property:opacity,-webkit-transform;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform}.u-fade-down-enter-active[data-v-a75f7a08],\r\n.u-fade-down-leave-active[data-v-a75f7a08],\r\n.u-fade-left-enter-active[data-v-a75f7a08],\r\n.u-fade-left-leave-active[data-v-a75f7a08],\r\n.u-fade-right-enter-active[data-v-a75f7a08],\r\n.u-fade-right-leave-active[data-v-a75f7a08],\r\n.u-fade-up-enter-active[data-v-a75f7a08],\r\n.u-fade-up-leave-active[data-v-a75f7a08]{transition-property:opacity,-webkit-transform;transition-property:opacity,transform;transition-property:opacity,transform,-webkit-transform}.u-fade-up-enter[data-v-a75f7a08],\r\n.u-fade-up-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);opacity:0}.u-fade-down-enter[data-v-a75f7a08],\r\n.u-fade-down-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);opacity:0}.u-fade-left-enter[data-v-a75f7a08],\r\n.u-fade-left-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);opacity:0}.u-fade-right-enter[data-v-a75f7a08],\r\n.u-fade-right-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);opacity:0}.u-slide-down-enter-active[data-v-a75f7a08],\r\n.u-slide-down-leave-active[data-v-a75f7a08],\r\n.u-slide-left-enter-active[data-v-a75f7a08],\r\n.u-slide-left-leave-active[data-v-a75f7a08],\r\n.u-slide-right-enter-active[data-v-a75f7a08],\r\n.u-slide-right-leave-active[data-v-a75f7a08],\r\n.u-slide-up-enter-active[data-v-a75f7a08],\r\n.u-slide-up-leave-active[data-v-a75f7a08]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.u-slide-up-enter[data-v-a75f7a08],\r\n.u-slide-up-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.u-slide-down-enter[data-v-a75f7a08],\r\n.u-slide-down-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}.u-slide-left-enter[data-v-a75f7a08],\r\n.u-slide-left-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.u-slide-right-enter[data-v-a75f7a08],\r\n.u-slide-right-leave-to[data-v-a75f7a08]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.u-zoom-enter-active[data-v-a75f7a08],\r\n.u-zoom-leave-active[data-v-a75f7a08]{transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform}.u-zoom-enter[data-v-a75f7a08],\r\n.u-zoom-leave-to[data-v-a75f7a08]{-webkit-transform:scale(.95);transform:scale(.95)}',""]),t.exports=a},"5bd6":function(t,a,e){"use strict";var n=e("2e40"),r=e.n(n);r.a},"73b4":function(t,a,e){"use strict";e.d(a,"b",(function(){return r})),e.d(a,"c",(function(){return o})),e.d(a,"a",(function(){return n}));var n={uCheckboxGroup:e("a1bc").default,uCheckbox:e("9a9c").default,uBackTop:e("e929").default},r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-uni-view",{ref:"u-back-top",staticClass:"u-page"},[e("v-uni-view",{staticClass:"u-demo-block"},[e("v-uni-text",{staticClass:"u-demo-block__title"},[t._v("自定义backTop(滚动页面即可在右下角看到图标)")]),e("v-uni-view",{staticClass:"u-demo-block__content"},[e("v-uni-view",{staticClass:"u-page__backTop-item"},[e("u-checkbox-group",{attrs:{placement:"column",shape:"square"},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.checkboxChange.apply(void 0,arguments)}},model:{value:t.value,callback:function(a){t.value=a},expression:"value"}},t._l(t.checkboxList,(function(t,a){return e("u-checkbox",{key:a,attrs:{customStyle:{marginBottom:"8px"},label:t.name,name:t.name}})})),1)],1)],1)],1),e("u-back-top",{attrs:{right:t.backTopData.right,customStyle:t.backTopData.customStyle,bottom:t.backTopData.bottom,icon:t.backTopData.icon,mode:t.backTopData.mode,iconStyle:t.backTopData.iconStyle,duration:t.backTopData.duration,scrollTop:t.scrollTop},on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.click.apply(void 0,arguments)}}})],1)},o=[]},8451:function(t,a,e){"use strict";e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("a9e3");var n={props:{mode:{type:String,default:uni.$u.props.backtop.mode},icon:{type:String,default:uni.$u.props.backtop.icon},text:{type:String,default:uni.$u.props.backtop.text},duration:{type:[String,Number],default:uni.$u.props.backtop.duration},scrollTop:{type:[String,Number],default:uni.$u.props.backtop.scrollTop},top:{type:[String,Number],default:uni.$u.props.backtop.top},bottom:{type:[String,Number],default:uni.$u.props.backtop.bottom},right:{type:[String,Number],default:uni.$u.props.backtop.right},zIndex:{type:[String,Number],default:uni.$u.props.backtop.zIndex},iconStyle:{type:Object,default:uni.$u.props.backtop.iconStyle}}};a.default=n},"8b0c":function(t,a,e){"use strict";e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("caad"),e("2532");var n={data:function(){return{value:["自定义图标"],backTopData:{mode:"circle",icon:"arrow-upward",bottom:100,customStyle:{},iconStyle:{},right:20,duration:300},scrollTop:0,checkboxList:[{name:"显示方形"},{name:"自定义图标"},{name:"自定义距离"},{name:"自定义样式"},{name:"自定义返回顶部滚动时间"}]}},onLoad:function(){this.backTopData.icon="arrow-up"},onPageScroll:function(t){this.scrollTop=t.scrollTop},methods:{checkboxChange:function(t){t.includes("显示方形")?this.backTopData.mode="square":this.backTopData.mode="circle",t.includes("自定义图标")?this.backTopData.icon="arrow-up":this.backTopData.icon="arrow-upward",t.includes("自定义距离")?(this.backTopData.bottom=300,this.backTopData.right=20):this.backTopData.bottom=100,t.includes("自定义样式")?(this.backTopData.customStyle={backgroundColor:"#2979ff"},this.backTopData.iconStyle={color:"#ffffff"}):(this.backTopData.customStyle={},this.backTopData.iconStyle={}),t.includes("自定义返回顶部滚动时间")?this.backTopData.duration=1500:this.backTopData.duration=300},click:function(){console.log("click")}}};a.default=n},"8e6c":function(t,a,e){"use strict";e.r(a);var n=e("73b4"),r=e("bbcb");for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return r[t]}))}(o);e("f3ff");var i=e("f0c5"),s=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,"1b4ac5dc",null,!1,n["a"],void 0);a["default"]=s.exports},9248:function(t,a,e){"use strict";var n=e("fc04"),r=e.n(n);r.a},"9fc5":function(t,a,e){"use strict";e.r(a);var n=e("b52f"),r=e.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=r.a},aa1e:function(t,a,e){"use strict";e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;a.default={fade:{enter:{opacity:0},"enter-to":{opacity:1},leave:{opacity:1},"leave-to":{opacity:0}},"fade-up":{enter:{opacity:0,transform:"translateY(100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateY(100%)"}},"fade-down":{enter:{opacity:0,transform:"translateY(-100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateY(-100%)"}},"fade-left":{enter:{opacity:0,transform:"translateX(-100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateX(-100%)"}},"fade-right":{enter:{opacity:0,transform:"translateX(100%)"},"enter-to":{opacity:1,transform:"translateY(0)"},leave:{opacity:1,transform:"translateY(0)"},"leave-to":{opacity:0,transform:"translateX(100%)"}},"slide-up":{enter:{transform:"translateY(100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateY(100%)"}},"slide-down":{enter:{transform:"translateY(-100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateY(-100%)"}},"slide-left":{enter:{transform:"translateX(-100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateX(-100%)"}},"slide-right":{enter:{transform:"translateX(100%)"},"enter-to":{transform:"translateY(0)"},leave:{transform:"translateY(0)"},"leave-to":{transform:"translateX(100%)"}},zoom:{enter:{transform:"scale(0.95)"},"enter-to":{transform:"scale(1)"},leave:{transform:"scale(1)"},"leave-to":{transform:"scale(0.95)"}},"fade-zoom":{enter:{opacity:0,transform:"scale(0.95)"},"enter-to":{opacity:1,transform:"scale(1)"},leave:{opacity:1,transform:"scale(1)"},"leave-to":{opacity:0,transform:"scale(0.95)"}}}},b52f:function(t,a,e){"use strict";e("7a82");var n=e("4ea4").default;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(e("5530")),o=n(e("fa5a")),i=n(e("51d6")),s={name:"u-transition",data:function(){return{inited:!1,viewStyle:{},status:"",transitionEnded:!1,display:!1,classes:""}},computed:{mergeStyle:function(){var t=this.viewStyle,a=this.customStyle;return(0,r.default)((0,r.default)({transitionDuration:"".concat(this.duration,"ms"),transitionTimingFunction:this.timingFunction},uni.$u.addStyle(a)),t)}},mixins:[uni.$u.mpMixin,uni.$u.mixin,i.default,o.default],watch:{show:{handler:function(t){t?this.vueEnter():this.vueLeave()},immediate:!0}}};a.default=s},b676:function(t,a,e){"use strict";e.r(a);var n=e("23cd"),r=e("9fc5");for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return r[t]}))}(o);e("5bd6");var i=e("f0c5"),s=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,"a75f7a08",null,!1,n["a"],void 0);a["default"]=s.exports},bbcb:function(t,a,e){"use strict";e.r(a);var n=e("8b0c"),r=e.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(o);a["default"]=r.a},bc32:function(t,a,e){var n=e("e6da");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("32d95c26",n,!0,{sourceMap:!1,shadowMode:!1})},e6da:function(t,a,e){var n=e("24fb");a=n(!1),a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\r\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\r\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \r\n */.u-page[data-v-1b4ac5dc]{height:1200px}.u-page__backTop-item[data-v-1b4ac5dc]{margin-top:10px}',""]),t.exports=a},e929:function(t,a,e){"use strict";e.r(a);var n=e("4a08"),r=e("2c9e");for(var o in r)["default"].indexOf(o)<0&&function(t){e.d(a,t,(function(){return r[t]}))}(o);e("9248");var i=e("f0c5"),s=Object(i["a"])(r["default"],n["b"],n["c"],!1,null,"3ff6506a",null,!1,n["a"],void 0);a["default"]=s.exports},f3ff:function(t,a,e){"use strict";var n=e("bc32"),r=e.n(n);r.a},fa5a:function(t,a,e){"use strict";e("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,e("a9e3");var n={props:{show:{type:Boolean,default:uni.$u.props.transition.show},mode:{type:String,default:uni.$u.props.transition.mode},duration:{type:[String,Number],default:uni.$u.props.transition.duration},timingFunction:{type:String,default:uni.$u.props.transition.timingFunction}}};a.default=n},fc04:function(t,a,e){var n=e("07e1");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=e("4f06").default;r("0593d7cc",n,!0,{sourceMap:!1,shadowMode:!1})}}]);