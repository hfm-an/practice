## 最长公共前缀



编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例 1:

输入: `["flower","flow","flight"]`
输出: "fl"
示例 2:

输入: `["dog","racecar","car"]`
输出: ""
解释: 输入不存在公共前缀。
说明:

所有输入只包含小写字母 a-z 。

首先整理下思路：

比较每一位上的字符串时肯定逃不掉的，所以常规来讲，应该会是 O(m * n) 的复杂度

其次如何去最常规的比较，我想到的办法就是随便抓一个字符串出来，把它当成基准字符串，然后依次的去和其他的字符串比较

这样做的依据就是，最终输出的一定是每个字符串的子集

假如说基准字符串是 `flower`, 则声明一个 `['f', 'l', 'o', 'w', 'e', 'r']` 长度的数组，然后去对 `flight` 这个字符串去做比较

比较到 `i` 那一位的时候，不相同了，则数组变为 `['f', 'l']`, 然后继续以 `['f', 'l']` 这个数组去比较下一个字符串

如果这个数组提前结束，则直接输出空字符串

否则就返回都执行完毕了的数组join之后的字符串

上代码：

```js
// 68ms, 击败了 98.27% 的用户
function logestCommonPrefix (strs) {
    const len = strs.length
    if (!len) return ''
    let mapArr = strs[0].split('')
    for (let i = 1; i < len; i ++) {
        if (mapArr.length === 0) {
            return ''
        }
        let str = strs[i]
        for (var j = 0; j < mapArr.length; j ++) {
            if (mapArr.length === 0) {
                return ''
            }
            if (str[j] === mapArr[j]) {
                continue
            } else {
                if (j <= mapArr.length - 1) {
                    mapArr.length = j
                }
            }
        }
    }
    return mapArr.join('')
}
```