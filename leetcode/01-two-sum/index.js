/**
 * @Author : Amnhh
 * @Date : 2018/11/5
 * @Email : amnhhlod@gmail.com
 * @Description : two sum
 * @Url : https://leetcode-cn.com/problems/two-sum/description/
 */

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

console.log(twoSum([3, 3], 6))