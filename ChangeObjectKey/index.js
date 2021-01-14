/**
 * 修改对象属性名的两种方式：
 * 
 * 方式一：JSON.parse(JSON.stringify(aaa).replace(/Name/g, "title"))
 * 方式一会有两个缺点：
 * - 1.如果属性值匹配到会被更改。
 * - 2.属性名中有部分匹配到也会被更改。
 * 
 * 方式二：使用递归对数组中每一个对象的属性名进行更该。
 * - 函数第一个参数是要修改的对象，
 * - 第二个参数传数组key为要被改的属性名，value为改成的属性名。
 * - 函数本身是一个深拷贝，通过对其每层中对象的“键”做匹配替换即实现了多层的“键”替换，
 * 另外这里如果传空数组此函数就是一个深拷贝。
 */
// 方式一：
var aaa = [
  {
    Name: "test1Name",
    type: "test",
  },
  {
    Name: "test2",
    model: "model2"
  }
]
var bbb = JSON.parse(JSON.stringify(aaa).replace(/Name/g, "title"));
console.log(bbb);
console.log('>>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>>>>>>')


// 方式二：
function copyTrans(obj, typeArr) {
  let result;
  const { toString } = Object.prototype;
  if (toString.call(obj) === '[object Array]') {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = copyTrans(obj[i], typeArr);
    }
  } else if (toString.call(obj) === '[object Object]') {
    result = {};
    for (const _key in obj) {
      if (obj.hasOwnProperty(_key)) {
        let flag = 0;
        let _value = null;
        for (let j = 0; j < typeArr.length; j++) {
          if (typeArr[j].key === _key) {
            flag = 1;
            _value = typeArr[j].value;
          }
        }
        if (flag) {
          result[_value] = copyTrans(obj[_key], typeArr);
        } else {
          result[_key] = copyTrans(obj[_key], typeArr);
        }
      }
    }
  } else {
    return obj;
  }
  return result;
}

const arr = [
  { name: 'key', age: '18' },
  { key: 'name', address: 'poyang' }
]

const res = copyTrans(arr, [{ key: 'name', value: 'myname' }, { key: 'key', value: 'myvalue' }]);
console.log(res);
console.log('>>>>>((手动分割线))>>>>>>>>>>>>>>>>>>>>>>>>')

