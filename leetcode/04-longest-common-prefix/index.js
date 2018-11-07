/**
 * @Author : Amnhh
 * @Date : 2018/11/7
 * @Email : amnhhlod@gmail.com
 * @Description : 最长公共前缀
 * @Url : https://leetcode-cn.com/problems/longest-common-prefix/
 */
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

console.log(logestCommonPrefix(["a","b"]))