/**
 * @Author : Amnhh
 * @Date : 2018/11/10
 * @Email : amnhhlod@gmail.com
 * @Description : 合并两个有序链表
 * @Url : https://leetcode-cn.com/problems/merge-two-sorted-lists/
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let ret = []

    while (l1 !== null || l2 !== null) {
        if (l1 === null) {
            ret.push(l2.val)
            l2 = l2.next
            continue
        }
        if (l2 === null) {
            ret.push(l1.val)
            l1 = l1.next
            continue
        }

        let l1Val = l1.val
        let l2Val = l2.val

        if (l1Val > l2Val) {
            ret.push(l2Val)
            l2 = l2.next
            continue
        }

        if (l1Val === l2Val) {
            ret.push(l1Val, l2Val)
            l1 = l1.next
            l2 = l2.next
            continue
        }

        if (l1Val < l2Val) {
            ret.push(l1Val)
            l1 = l1.next
            continue
        }
    }
    return ret
};