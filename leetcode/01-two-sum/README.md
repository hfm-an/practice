## two-sum

首先题目：

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：

给定 `nums = [2, 7, 11, 15]`, `target = 9`

因为 `nums[0] + nums[1] = 2 + 7 = 9`

所以返回 `[0, 1]`

### 最初始的解法：

```js
function twoSum (nums, target) {
    const len = nums.length;
    let ret = []
    let count = 0
    for (let i = 0; i < len; i ++) {
        for (let j = i + 1; j < len; j ++) {
            count ++
            if (nums[i] + nums[j] === target) {
                ret = [i, j]
            }
        }
    }
    console.log(count)
    return ret
}
```

我们在 `count` 能看出一共执行了多少次，上面这个最大的问题，其实就是，就算是 `i = 0`, `j = 1` 的时候就已经命中了，后续还会继续进行着，直到执行完成.

入参为 `([2, 7, 11, 15, 12, 23, 13, 30], 9)` 的时候，执行了 `28` 次

下面我们进行一些改进

```js
function twoSum (nums, target) {
    const len = nums.length;
    let ret = []
    let count = 0
    for (let i = 0; i < len; i ++) {
        for (let j = i + 1; j < len; j ++) {
            count ++
            if (nums[i] + nums[j] === target) {
                ret = [i, j]
                break
            }
        }
        if (ret.length !== 0) {
            break
        }
    }
    console.log(count)
    return ret
}
```

现在进行一个修改，在 `i, j` 的值命中的时候，就跳出内层循环，在外层循环每次执行的末尾，校验结果数组 `ret` 是否为初始状态，不为初始状态则说明已经命中

修改之后，发现 `i, j` 分别是第一个就命中的时候，就跳出了两层循环，则执行了一次，count 值变为了 `1`

如果说第二个入参是 `43` 的话，则上面的方法也会执行 `28` 次，效率也不算高

仔细想下，如果说两数之和为 `target` 的话，则其中任意一个数字都不会大于 `target` ，所以如果说 `i > target` 的话，则可以直接进行下一步，改进后的代码：

```js
function twoSum (nums, target) {
    const len = nums.length;
    let ret = []
    let count = 0
    for (let i = 0; i < len; i ++) {
        if (nums[i] > target) continue
        for (let j = i + 1; j < len; j ++) {
            count ++
            if (nums[i] + nums[j] === target) {
                ret = [i, j]
                break
            }
        }
        if (ret.length !== 0) {
            break
        }
    }
    console.log(count)
    return ret
}
```

这次我们将入参改成了 `([2, 7, 11, 50, 60, 23, 13, 30], 43)`, 不加 `continue` 的话还是需要执行 `28` 次，但是加了之后，改进成为 `21` 次，如果说大于 `target` 的值出现的越早，则免去的次数越多。

当然这个也是有限制的，就是所有数据中不能出现负数

感觉已经优化到极致了，但是时间复杂度始终都会是 O(n^2), 想要复杂度降低一个级别，只能使用额外的数据结构

我们使用 hashMap 的形式，遍历两次入参数组，而不是嵌套遍历入参数组：

```js
function twoSum (nums, target) {
    const len = nums.length;
    let ret = []
    let count = 0
    let hashMap = {}

    for (let i = 0; i < len; i ++) {
        hashMap[nums[i]] = i
        count ++
    }

    console.log(hashMap)

    for (let i = 0; i < len; i ++) {
        count ++
        let secondVal = hashMap[target - nums[i]]
        if (secondVal !== undefined) {
            ret = [i, secondVal]
        }
    }

    console.log(count)
    return ret
}
```

这样还是会出现问题，就是说如果入参数组中存在两个相同的值，则会出现问题，类似入参为 `([3, 3], 6)` 会输出 `[1, 1]`

简单修改下，第二遍遍历的时候，只要再判断下是否与自身相等就好了

```js
function twoSum (nums, target) {
    const len = nums.length;
    let ret = []
    let hashMap = {}

    for (let i = 0; i < len; i ++) {
        hashMap[nums[i]] = i
    }


    for (let i = 0; i < len; i ++) {
        let secondVal = hashMap[target - nums[i]]
        if (secondVal !== undefined && secondVal !== i) {
            ret = [i, secondVal]
        }
    }

    return ret
}
```

这时候感觉这条路也已经走到了极致，那我们需要想下是否有一条更简单的路？有的，那就是一次遍历，解决 `hashMap` 建立索引 + 寻值

简单修改下，因为至多只会出现两个数字之和等于 `target`, 而且这两个数字值可能是相同的，我们又需要一个 `hashMap` 去将 `O(n^2)` 降为 `O(n)`, 所以一定不能先遍历一次数组去建立 `hashMap`

比如入参是 `([3, 3], 6)` 的时候，我们需要捕捉到第一个 `3` 进入 `hashMap`, 第二个 `3` 未进入 `hashMap` 的那个时机去判断是否命中，命中则输出，不命中则继续，因为二者相等，所以其实覆盖掉也没什么关系，因为有且只有一组解，所以如果不命中则两个数字肯定都不是最终的结果。。。

所以总结下，我们需要一个一个的去放入 `hashMap`, 并且在放入的时候进行判断：

```js
function twoSum (nums, target) {
    const len = nums.length;
    let hashMap = {}

    for (let i = 0; i < len; i ++) {
        // 检验是否已经存在了缺失的第二个数字
        let secondVal = hashMap[target - nums[i]]

        // 如果第二个数字存在，则命中，直接返回
        if (secondVal !== undefined) {
            return [secondVal, i]
        }

        // 否则就记录下现有的这个数字
        hashMap[nums[i]] = i
    }

    return ret
}
```