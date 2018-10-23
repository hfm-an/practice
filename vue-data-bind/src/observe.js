/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
import Dep from './dep'
import Utils from './utils'

function observe (data) {
    new Observe(data)
}

/**
 * 观察者构造函数
 * @param data
 * @constructor
 */
function Observe (data) {
    this.data = data
    this.init()
}

const proto = Observe.prototype

/**
 * 初始化这些数据，设置属性的 getter 和 setter
 */
proto.init = function () {
    let _data = this.data
    // 每个属性都为他们设置 getter 和 setter
    Object.keys(this.data)
        .map((key) => {
            this.defineReactive(key, _data, _data[key])
        })
}

proto.defineReactive = function (key, data, val) {
    let value = val
    const dep = new Dep()
    // 如果一级属性是一个对象的话，则将他的属性也设置 getter 和 setter
    if (Utils.isObject(val)) {
        observe(val)
    }
    Object.defineProperty(
        data,
        key,
        {
            /**
             * 当一个属性在页面里被 get 的时候，说明页面里的某个 dom 元素或者指令，依赖这个属性
             * 所以依赖的收集是在 get 中进行
             * @returns {*}
             */
            get () {
                if (Dep.target) {
                    dep.depend()
                }
                // 订阅者的收集
                return value
            },
            /**
             * 观察-订阅的这种模式中，
             * 如果属性改变，就需要通知每一个订阅者，触发订阅者相关的方法
             * @param newValue
             */
            set (newValue) {
                value = newValue
                // 属性被重新赋值的时候，通知订阅者执行相应的方法
                dep.notify()
            }
        }
    )
}


export default observe