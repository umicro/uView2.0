# 发布新版本
## 公共修改
### uni_modules/uview-ui/libs/config/config.js 中修改版本信息
### uni_modules/uview-ui/package.json 中修改版本信息
## 版本修改记录
### 2.0.46 u-number-box组件支持小数点输入 
修改了u-number-box组件判断integer属性是否在键盘中支持小数
41行修改为:type="integer ? 'number' : 'digit'"

# 在uview-ui目录下执行发布版本
npm publish --access=public