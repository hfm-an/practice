/**
 * @Author : Amnhh
 * @Date : 2018/11/6
 * @Email : amnhhlod@gmail.com
 * @Description : 回文数
 * @Url : https://leetcode-cn.com/problems/palindrome-number/description/
 */

function isPalindrome (x) {
    if (x < 0) return false
    if (x % 10 === 0 && x !== 0) return false
    let lastIndexNum = 0

    while (x > lastIndexNum) {
        lastIndexNum = 10 * lastIndexNum + x % 10
        x = parseInt(x / 10)
    }

    return x === lastIndexNum || x === parseInt(lastIndexNum / 10)
}