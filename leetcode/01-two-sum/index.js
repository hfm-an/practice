/**
 * @Author : Amnhh
 * @Date : 2018/11/5
 * @Email : amnhhlod@gmail.com
 * @Description : two sum
 * @Url : https://leetcode-cn.com/problems/two-sum/description/
 */

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

console.log(twoSum([3, 3], 6))