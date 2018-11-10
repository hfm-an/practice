/**
 * @Author : Amnhh
 * @Date : 2018/11/10
 * @Email : amnhhlod@gmail.com
 * @Description : 有效的括号
 * @Url : https://leetcode-cn.com/problems/valid-parentheses/
 */

function isValid (s) {
    let len = s.length

    // 奇数长度的排除
    // 进行一些很明显的筛选
    if (s.length % 2 !== 0) {
        return false
    }

    if (s.length === 0) {
        return true
    }

    const PARENT_THESES_MAP = {
        '}' : '{',
        ']' : '[',
        ')' : '('
    }

    // 把解析的过程描述成一个栈，左括号的时候进栈，右括号的时候出栈
    // 出栈时的右括号，必须与栈顶的左括号相对应，否则直接 return false
    let stack = []

    for (let i = 0; i < len; i ++) {
        let current = s[i]
        if (!PARENT_THESES_MAP[current]) {
            stack.unshift(current)
            continue
        }
        let reverseParentThese = PARENT_THESES_MAP[current]
        if (stack[0] === reverseParentThese) {
            stack.shift()
            continue
        } else {
            return false
        }
    }

    if (stack.length !== 0) {
        return false
    } else {
        return true
    }
}