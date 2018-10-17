/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
import Dep from './dep'

function Watcher (vm, propertyName, cb) {
    this.vm = vm
    this.cb = cb
    this.depMap = {}

    this.getter = this.getterFactory(propertyName)
    this.value = this.getValue()
}

const proto = Watcher.prototype

/**
 * 用于获取绑定依赖
 * @returns {*}
 */
proto.getValue = function () {
    Dep.target = this
    let value = this.getter()
    Dep.target = null
    return value
}

/**
 * 生产一个 getter 函数，用于获取属性的值
 * @param propertyName
 * @returns {Function}
 */
proto.getterFactory = function (propertyName) {
    let _self = this
    return function () {
        return _self.vm.$data[propertyName]
    }
}

proto.addDep = function (dep) {
    if (!this.depMap[dep.id]) {
        this.depMap[dep.id] = true
        dep.addSub(this)
    }
}

proto.update = function () {
    this.value = this.getter()
    this.cb(this.value)
}

export default Watcher