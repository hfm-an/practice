## 匹配的括号

首先说下题目：

给定一个只包括 `'('，')'，'{'，'}'，'['，']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

## 思路 1

也是妹子给到的灵感，若一个简单的字符串满足括号的匹配，则必然有左右对称，例如：

```
({}) => 必然有 ({ | }) 左右对称
```

但是有个弊端，是我们通过一个字符一个字符解析的方式，必然不能很好地拆分出每一个左右对称的字符串单元，比如：

```
{(){()}} => 需要拆成： {, (), {()}, }
```

而且拆出来之后，我们不能通过统一的方法去判断每一个字符单元，比如上面的这个，需要两种方式：

1. 判断里面每一个 >=2 长度的字符单元是否对称
2. 判断长度为 1 的字符单元，在外面是否还有一个字符单元和他配对

这个拆的难度很大，而且暂时想不到怎么拆，所以这个方法 GG

## 思路 2

在思考的时候，发现他们的几条规则：

1. 长度必须为偶数，为奇数的字符串一定不合法
2. 长度为 0 可以直接返回 true
3. 解析到右侧回括号类似： `})]` 这仨的时候，前面解析到的最后一个左侧括号一定和它对应

这几条规则也就是我们最终代码的几个步骤

首先，奇数的排除，长度为 0 直接返回 true

```js
let len = s.length

if (s.length % 2 !== 0) {
    return false
}

if (s.length === 0) {
    return true
}
```

第三条规则，我们可以把解析的过程模拟为一个栈的行为，在解析到左侧括号的时候，执行入栈操作，解析到右侧括号的时候，执行出栈操作。

解析到右侧括号的时候，如果发现栈顶的左侧括号与之不匹配，则直接返回 false， 匹配的话，则栈顶出栈

这里为判断左侧括号还是右侧括号，需要一个数据结构去存储左侧括号和右侧括号的值，数组和对象之间选择了对象，因为对象的判断是 O(1), 而数组在随机访问的时候是 O(1)，而在查找的时候效率很低

```js
const PARENT_THESES_MAP = {
    '}' : '{',
    ']' : '[',
    ')' : '('
}
```

然后是出栈入栈的过程：

```js
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
```

最后如果说都执行完毕了，说明从右侧括号的对应上，没有问题，但是想象下以下的字符串：

```
{{{{{{{{
```

比较简单粗暴，上面这个字符串，执行上面的栈没有任何问题，因为一直在进栈，没有出

为了避免这种情况，也简单，一一对应的行为，一定会有最后全部出栈

所以我们需要做的，是最终检验一下 stack 的长度：

```js
if (stack.length !== 0) {
    return false
} else {
    return true
}
```

完整代码：

```js
// 64ms, 击败 99.11% 的用户
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
```