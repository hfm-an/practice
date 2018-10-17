/**
 * @Author : Amnhh
 * @Date : 2018/10/17
 * @Email : amnhhlod@163.com
 * @Description :
 */
function Dep () {
    // 依赖列表
    this.subs = []
}

const proto = Dep.prototype

proto.depend = function () {
    this.addSub(Dep.target)
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