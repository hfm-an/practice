/**
 * 解析 dom
 * @param el dom 的选择器
 * @param vm 我们解析了 dom 需要和 vm.$data 挂钩，所以 vm 也需要传入
 * @constructor
 */
import Utils from './utils'
import resolveUtil from './resolveUtil'

function DomResolve (el, vm) {
    this.vm = vm
    this.data = vm.$data

    // 确保 el 为 dom 元素
    if (!Utils.isElementNode(el)) {
        el = document.querySelector(el)
    }
    this.$el = el

    // 先拷贝出来一份 $el, 在内存里处理和完成绑定之后，再覆盖回去
    let fragment = document.createDocumentFragment()
    fragment = this.$el.cloneNode(true)
    this.$fragment = fragment

    // 将所有绑定全都在 fragment 上执行一遍
    this.initResolve()
    // 然后移除 #app
    document.body.removeChild(this.$el)
    // 再往 body 里把 fragment 的 #app 填充进去
    document.body.appendChild(this.$fragment)
}

const proto = DomResolve.prototype

proto.initResolve = function () {
    let childs = this.$fragment.childNodes
    const BRACKET_REG = /\{\{(.*)\}\}/
    ;[].slice.call(childs)
        .map(node => {
            if (Utils.isTextNode(node) && BRACKET_REG.test(node.textContent)) {
                this.resolveTextNode(
                    node,
                    node.textContent
                        .replace('{{', '')
                        .replace('}}', '')
                        .replace(/\s/g, '')
                )
            } else if (Utils.isElementNode(node)) {
                this.resolveElementNode(node)
            }
        })
}

/**
 * 解析文本节点
 * @param node
 * @param propertyName
 */
proto.resolveTextNode = function (node, propertyName) {
    resolveUtil.text(node, propertyName, this.vm)
}

/**
 * 解析 element 节点
 * @param node
 */
proto.resolveElementNode = function (node) {
    let attributes = [].slice.call(node.attributes)
    const DIRECTIVE_REG = /^v-/
    attributes.map(attribute => {
        let name = attribute.name
        // 说明是内置指令
        if (DIRECTIVE_REG.test(name)) {
            let directiveName = name.replace(/^v-/, '')
            this[`resolve${directiveName[0].toUpperCase() + directiveName.slice(1)}Node`](node, attribute.value)
        }
    })
}

export default DomResolve