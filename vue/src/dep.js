/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
let id = 1

function Dep () {
    // 每个 Dep 的唯一标识
    this.id = id ++
    // 依赖列表
    this.subs = []
}

const proto = Dep.prototype

proto.depend = function () {
    Dep.target.addDep(this)
}

proto.addSub = function (watcher) {
    this.subs.push(watcher)
}

proto.notify = function () {
    this.subs.map(sub => {
        sub.update()
    })
}

export default Dep