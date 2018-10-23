/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
import Dep from './dep'

// let id = 1

function Watcher (vm, propertyName, cb) {
    // this.id = id ++
    this.vm = vm
    this.cb = cb
    this.depMap = {}

    this.getter = this.getterFactory(propertyName)
    this.value = this.getValue()
}

const proto = Watcher.prototype

/**
 * 用于获取绑定依赖
 * 如果说我们获取这个 value，则说明这个 watcher 对应的那一个 v-text 是依赖于这个 property name 的
 * 所以我们就在这个函数里将这个 watcher 添加到这个 propertyName 对应的 dep 的订阅列表中
 *
 * 而下一次 propertyName 对应的数据发生变化的时候，我们则可以直接通过 getter 去拿到新的值去更新视图
 * 防止多次依赖的添加
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

// proto.addDep = function (dep) {
//     if (!this.depMap[dep.id]) {
//         this.depMap[dep.id] = true
//         dep.addSub(this)
//     }
// }

/**
 * 因为后续 update 值，都是直接获取的属性，而并没有 getValue 的值
 * 所以不会触发多次收集依赖
 */
proto.update = function () {
    this.value = this.getter()
    this.cb(this.value)
}

export default Watcher