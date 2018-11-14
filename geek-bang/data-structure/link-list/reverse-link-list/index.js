/**
 * 反转单链表
 */

const Linklist = require('./../LinkList')

 /**
  * 先是一种能想到的暴力方法， 拆了之后重新组装：
  *     1. 遍历单链表，把单链表里的值都取出来存放到一个栈里
  *     2. 遍历完成后，再挨个出栈去拼装成结果链表
  */
function ReverseLinkList (linklist) {
    const stack = []
    while (linklist.next !== null) {
        stack.push(linklist.val)
    }
    let linkList = new Linklist()
    while (stack.length !== 0) {
        linkList.insert
    }
}