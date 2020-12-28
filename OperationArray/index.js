// 一维数组转二维数组
const longArr = [1, 12, 13, 21, 22, 23, 31, 32, 33];
function translateErWei(arr, n) {
  let index = [];
  let result = [];
  if (n >= arr.length || n === 1) {
    return arr
  }
  for (let i = 1; i <= arr.length; i++) {
    if (i % n === 0) {
      index.push(i)
    }
  }
  for (let j of index) {
    console.log(j);
    const rest = arr.slice(j - n, j)
    result.push(rest)
  }
  const restIndex = index.length * n;
  result.push(arr.slice(restIndex))
  return result.filter(item => item.length > 0)
}
const a = translateErWei(longArr, 8)
console.log(a)
console.log('>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>>>>')
