## 合并两个有序的链表

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

### 最简单粗暴的解法：

因为看了下评论里面，说 js 解法的入参是一个一个的 linklist，但是返回值要数组。。。所以这里直接返回是数组

```js
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
```

