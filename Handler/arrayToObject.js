const arr = ['arr1', 'arr2', 'arr3'];

// 数组转对象方式一：对象结构
const obj1 = { ...arr }
console.log(obj1);  // {0: "arr1", 1: "arr2", 2: "arr3"}

// 数组转对象方式二：for...in循环
let obj2 = {}
for (k in arr) {
  obj2[k] = arr[k];
}
console.log(obj2);  // {0: "arr1", 1: "arr2", 2: "arr3"}

// 数组转对象方式三：Object.assign()
const obj3 = Object.assign({}, arr);
console.log(obj3);  // {0: "arr1", 1: "arr2", 2: "arr3"}

// 数组转对象方式四：reduce()
const obj4 = arr.reduce((obj, arr, index) => {
  obj[index] = arr;
  return obj;
}, {});
console.log(obj4);  // {0: "arr1", 1: "arr2", 2: "arr3"}
console.log('>>>>>((手动分割线，数组转对象))>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

