/**
* @Author : Amnhh
* @Date : 2018/10/17
* @Email : amnhhlod@163.com
* @Description :
*/
import observe from './observe'
import DomResolve from './domResolve'

export default function Hfm (opt) {
    this.$opt = opt
    this.$data = opt.data
    
    // 观察每个属性值
    observe(this.$data)
    
    // 解析 dom
    new DomResolve(this.$opt.el, this)
}