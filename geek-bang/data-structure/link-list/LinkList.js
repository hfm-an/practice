/**
 * 链表的一些简单的实现与方法
 */

const Node = require('./Node')

 class LinkList {
     constructor (val) {
         this.head = new Node(val)
         this.length = 1
     }

     /**
      * 将值为 val 的 Node 插入到 target 后边
      */
     insert (target, val) {
        let targetNode = this.find(target)

        if (targetNode !== null) {
            let valNode = new Node(val)
            // 这时候只能说明找到了
            // 如果说不在末尾：
            if (targetNode.next !== null) {
                valNode.next = targetNode.next
                targetNode = valNode
            } else {
                console.log(`插入 val 值为 ${val} 的节点成功`)
                targetNode.next = valNode
            }
            return
        }
        console.log(`插入 val 值为 ${val} 的节点失败`)
     }

     /**
      * 链表中寻找 val 为 target 的节点，返回它的引用
      */
     find (target) {
        let ret = this.head
        while (ret.next !== null) {
            if (ret.val === target) {
                return ret
            }
            ret = ret.next
        }
        return null
     }
 }