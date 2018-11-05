/**
 * @Author : Amnhh
 * @Date : 2018/11/6
 * @Email : amnhhlod@gmail.com
 * @Description : 反转整数
 * @Url : https://leetcode-cn.com/problems/reverse-integer/description/
 */

function reverseInteger (x) {
    let reverseStr = x.toString().split('').reverse()
    let len = reverseStr.length
    let flag = x < 0
    if (flag) {
        reverseStr.length = len - 1
        reverseStr = -Number(reverseStr.join(''))
    } else {
        reverseStr = Number(reverseStr.join(''))
    }
    if (reverseStr > Math.pow(2, 31) - 1 || reverseStr < Math.pow(-2, 31)) {
        return 0
    }
    return reverseStr
}

console.log(reverseInteger(1534236469))