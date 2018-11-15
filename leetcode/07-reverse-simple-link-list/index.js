/**
 * 反转单链表
 * 这里就暂时先拿 leetcode 作为测试的引擎
 * 
 * https://leetcode-cn.com/problems/reverse-linked-list/
 */

 /**
  * 先是一种能想到的暴力方法， 拆了之后重新组装：
  *     1. 遍历单链表，把单链表里的值都取出来存放到一个栈里
  *     2. 遍历完成后，再挨个出栈去拼装成结果链表
  * 尝试的实现了下，大概执行时间是 80ms 左右，击败大概 78.32% 的用户
  */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    // 如果传入的是空链表，则返回 []
    if (head === null) return []
    // 所有 val 都取出来
    const stack = []
    while (head) {
        stack.push(head.val)
        head = head.next
    }
    // 然后重新创建一个新的链表，一个一个的赋值进去
    let Head = new ListNode(stack.pop())
    let _head = Head
    while (stack.length !== 0) {
        _head.next = new ListNode(stack.pop())
        _head = _head.next
    }
    return Head
};

/**
 * 后面想到的一种方法，就是原来的链表头部开始
 * 一个一个的取，取出来第一个，然后令第一个元素的 next 属性为 null
 * 然后取出第二个，令第二个属性的 next 为第一个元素
 * 这里需要注意的是，都必须是副本，不然你在给第一个元素的 next 值赋值给 null 的时候
 * 就已经丢失了对链表从第二个元素开始的所有的引用，后半截链表就成了内存的碎片了
 * 
 * 最快可以到达 76ms，击败了87.99%的用户
 */
var reverseList = function(head) {
    if (head === null) return []
    
    // 首先初始化新的链表
    // 因为我们要从 1->2->3 的形式改成 3->2->1，可以理解为：1<-2<-3
    // 所以我们取出来 1 的时候，其实是最后的那个元素，而我们取出来 2 的时候
    // 只需要把 2.next = 1 
    // 这个 _head 就是从初始化的 1 开始，在循环的过程中一直维护着链头
    let _head = new ListNode(head.val)
    
    head = head.next
        
    while (head !== null) {
        let node = new ListNode(head.val)
        node.next = _head
        _head = node
        head = head.next
    }
    
    return _head
};