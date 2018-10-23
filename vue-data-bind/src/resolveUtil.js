/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */

import resolveReducers from './resolveReducers'
import Watcher from './watcher'

const resolveUtil = {
    text (node, propertyName, vm) {
        this.bind(node, propertyName, 'text', vm)
    },
    bind (node, propertyName, type, vm) {
        const reducerFunction = resolveReducers[`${type}Reducer`]
        reducerFunction(node, this.getValue(propertyName, vm))
        new Watcher(vm, propertyName, function (newValue) {
            reducerFunction(node, newValue)
        })
    },
    /**
     * 这一步没有执行依赖的收集，只是单纯的替换文本
     */
    getValue (propertyName, vm) {
        return vm.$data[propertyName]
    }
}

export default resolveUtil