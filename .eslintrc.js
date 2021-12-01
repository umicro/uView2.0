module.exports = {
    extends: ['airbnb'],
    rules: {
        // 关闭严格模式的提示
        strict: 0,
        // 强制4个空格缩进
        indent: ['error', 4],
        // 不允许出现分号
        semi: ['error', 'always'],
        // 是否检查连续等号赋值
        'no-multi-assign': 0,
        // 要求 require() 出现在顶层模块作用域中，禁止它
        'global-require': 0,
        // 允许console，覆盖来自airbnb的规则
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'prefer-rest-params': 'off',
        // 禁用对象最后一个属性的逗号
        'comma-dangle': ['error', 'never'],
        // 可以使用未定义的变量，因为会全局引用uni对象
        'no-undef': 'off',
        // 允许lf和crlf文件行尾
        'linebreak-style': 'off',
        // 关闭function的jsdoc校验
        'jsdoc/check-tag-names': 'off'
    }
}
