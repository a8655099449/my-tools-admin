/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

var isMatch = function (s, p) {
  // 先判断有没有存在 * 
  // 不存在*的时候要全等于
  if (p.indexOf(`*`) === -1) {

    if (s.length !== p.length) {
      return false
    }

    for (let i = 0; i < s.length; i++) {
      if (p[i] !== s[i] && p[i] !== `.`) {
        return false
      }
    }
    return true
  }

  // 如果存在 * 

  // 如果 p 最后不等于 * 

  if (p[p.length - 1] !== '*' && p[p.length - 1] !== '.' &&
    p[p.length - 1] !== s[s.length - 1]
  ) {
    return false
  }



  // 计算s必须要的长度
  let count = 0
  for (let i = 0; i < p.length; i++) {
    if (p[i + 1] !== `*`) {
      count++
    } else {
      i++
    }


  }

  if (s.length < count) {
    console.log('👴2022-03-18 15:28:03 test.js line:57', `长度不符合规则`)
    return false
  }


  let j = 0
  let isFirst = false
  // 然后开始匹配
  for (let i = 0; i < s.length; i++) {

    const nextIsStar = p[j + 1] === `*`
    if (s[i] === p[j] || p[j] === '.') {
      isFirst = false
      // 如果在相等的情况下 如果下一个是* 则不需要+1
      if (!nextIsStar) {
        j++
      }
      // 如果不等于
    } else {
      if (isFirst) {
        return false
      }
      // 如果是第一位
      const AddCount = nextIsStar ? 2 : 1
      j += AddCount
      i--
      isFirst = true
    }
    // 如果是最后一位了
    if (i === s.length - 1) {
      let lastP = p.substring(j)
      console.log('👴2022-03-18 15:23:38 test.js line:69', lastP)
      if (p.length === 0) {
        return true
      }

      while (lastP.length) {
        if (lastP[0] !== `*` && lastP[0] !== `.` && lastP[1] !== `*` && lastP[0] !== s[s.length - 1]) {
          return false
        }
        lastP = lastP.substring(1)
      }





      if (lastP.length > 0) {
        // p 还有剩余 且最后一个不为 * 返还false
        if (lastP[lastP.length - 1] !== `*`) {
          return false
        }

        if (lastP.split(`*`).some(item => item.length > 1)) {
          return false
        }
      }

    }
  }
  return true
};


// @lc code=end


const testList = [
  ["aasdfasdfasdfasdfas",
    "aasdf.*asdf.*asdf.*asdf.*s", true],
  ["a", "ab*a", false],
  ["aaa", "a*a", true],
  ["aab", "c*a*b", true],
  ["ab", ".*..", true],


]

testList.forEach(item => {
  const res = isMatch(...item)

  if (res !== item[2]) {
    console.log(`👴${item[0]},${item[1]}测试结果有误`, res)
  }
})

