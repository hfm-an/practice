## 反转整数

题目：

给定一个 32 位有符号整数，将整数中的数字进行反转。

假设我们的环境只能存储 32 位有符号整数，其数值范围是 `[−231,  231 − 1]`。根据这个假设，如果反转后的整数溢出，则返回 0。

首先想到的其实是在很多库里有看到过的，先转化成字符串，再转化成数组，然后调用数组 `reverse` 方法，然后再一步一步回退成数字

```js
// 112ms
function reverseInteger (x) {
    let str = x.toString()
    let minusFlag = str.indexOf('-') !== -1 ? '-' : ''
    if (minusFlag) {
        str = str.slice(1)
    }
    let ret = Number(minusFlag + str.split('').reverse().join(''))
    if (ret > Math.pow(2, 31) || ret < Math.pow(-2, 31)) {
        return 0
    }
    return Number(minusFlag + str.split('').reverse().join(''))
}
```

实现了效果，但是有些麻烦

我们可以统一去判断正负号：

```js
// 113ms
function reverseInteger (x) {
    let ret = Number(x.toString().replace('-', '').split('').reverse().join(''))
    let flag = x >= 0
    if (flag) {
        if (ret > Math.pow(2, 31) - 1) {
            return 0
        }
    }
    if (!flag) {
        ret = -ret
        if (ret < Math.pow(-2, 31)) {
            return 0
        }
    }

    return ret
}
```

然而经过 leetcode 测试。。这种还没有上面那种要来的快

猜想可能是 `replace` 那一步比较慢，所以将 `replace` 替换成 `Math.abs`

```js
// 124ms
function reverseInteger (x) {
    let ret = Number(Math.abs(x).toString().split('').reverse().join(''))
    let flag = x >= 0
    if (flag) {
        if (ret > Math.pow(2, 31) - 1) {
            return 0
        }
    }
    if (!flag) {
        ret = -ret
        if (ret < Math.pow(-2, 31)) {
            return 0
        }
    }

    return ret
}
```

然后发现更慢了...

于是感觉是对负号的处理问题。。修改成先 reverse 字符串，然后再判断末尾是不是负号，然后做特殊处理：

```js
// 104ms
function reverseInteger (x) {
    let reverseStr = x.toString().split('').reverse().join('')
    let len = reverseStr.length
    if (reverseStr[len - 1] === '-') {
        reverseStr = '-' + reverseStr.slice(0, len - 1)
    }
    reverseStr = Number(reverseStr)
    if (reverseStr > Math.pow(2, 31) || reverseStr < Math.pow(-2, 31) - 1) {
        return 0
    }
    return reverseStr
}
```

用时 104 ms, 已经几乎快要超过官方给出的模10法

紧接着再优化，在判断是否是负数的时候，我们根本就不需要去访问数组的末尾是否为 `-`, 而是直接判断入参是否小于 `0` 就好了:

```
// 100ms
function reverseInteger (x) {
    let reverseStr = x.toString().split('').reverse()
    let len = reverseStr.length
    let flag = x < 0
    if (flag) {
        reverseStr.length = len - 1
    }
    reverseStr = flag ? -Number(reverseStr.join('')) : Number(reverseStr.join(''))
    if (reverseStr > Math.pow(2, 31) - 1 || reverseStr < Math.pow(-2, 31)) {
        return 0
    }
    return reverseStr
}
```

大家看到，这时候的速度已经和模十法相同了

我们可以用代码去模拟每次拿出最后一位的过程，在每次执行末尾变前位的时候，去判断反向后的数字 * 10 是否大于 MAX_VALUE, 或者是否小于 MIN_VALUE

```js
// 96 ms
function reverseInteger (x) {
    let ret = 0
    let tmp
    let max = Math.pow(2, 31) - 1
    let min = Math.pow(-2, 31)

    while (x !== 0) {
        tmp = x % 10
        x = x > 0 ? Math.floor(x / 10) : Math.ceil(x / 10)

        if (x >= 0 && ((ret > max / 10) || (ret === max / 10 && tmp > 7))) return 0
        if (x <= 0 && ((ret < min / 10) || (ret === min / 10 && tmp < -8))) return 0

        ret = ret * 10 + tmp
    }

    return ret
}
```

执行的速度，还是很看 leetcode 的心情的感觉。。