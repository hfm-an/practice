/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
const utils = {}


/**
 * 状态检查函数
 */
const TYPE_NAMES = ['String', 'Number', 'Object', 'Array', 'Boolean', 'Null', 'Undefined']

TYPE_NAMES.map(type => {
    utils[`is${type}`] = function (val) {
        return Object.prototype.toString.call(val) === `[object ${type}]`
    }
})

/**
 * 检测是否是 dom element
 * @param node
 * @returns {boolean}
 */
utils.isElementNode = function (node) {
    return node.nodeType === 1
}

utils.isTextNode = function (node) {
    return node.nodeType === 3
}

export default utils