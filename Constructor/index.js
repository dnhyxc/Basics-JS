function Test(name) {
  console.log(this);
  this.user = name;
  return {};
}

const newObj = new Test('dnhyxc');
console.log(newObj.user, 'return {}');  // undefined
console.log('>>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')


function Test1(name) {
  console.log(this);
  this.user = name;
  return [];
}

const newObj1 = new Test1('dnhyxc');
console.log(newObj1.user, 'return []'); // undefined
console.log('>>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')


function Test2(name) {
  console.log(this);
  this.user = name;
  return null;
}

const newObj2 = new Test2('dnhyxc');
console.log(newObj2.user, 'return null'); // dnhyxc
console.log('>>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')


function Test3(name) {
  console.log(this);
  this.user = name;
  return undefined;
}

const newObj3 = new Test3('dnhyxc');
console.log(newObj3.user, 'return null'); // dnhyxc
console.log('>>>))手动分割线)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

/**
 * 总结：
 *  1，构造函数中，this 总是指向新构造出来的实例对象。
 * 
 *  2，构造函数与普通函数最大的区别就是需要使用 new 关键字进行调用。
 * 
 *  3，使用 new 关键字调用构造函数时，会产生四个过程，分别为：
 *    - 创建一个 Object 对象实例。可以看成:
 *      const obj = new Object();
 *            obj.name = 'dnhyxc';
 * 
 *    - 将构造函数的执行对象赋给新生成的这个实例（即将 this 指向这个构造出来的实例对象）。
 *    因此 this.name = 'dunyxc' 相当于 obj.name = 'dnhyxc'。
 * 
 *    - 执行构造函数中的代码。
 * 
 *    - 返回新生的这个实例对象。注意：如果被调用的函数没有显示的 return 表达式（仅限于返回对象类型的情况）时，
 *    则会隐式的返回 this 对象，也就是新创建的实例对象。
 * 
 *  说明：显示的返回：undefined、null、boolean、number、string 等基本数据类型则不会代替 new 关键字调用的默认行为。
 *  也就是说此时会隐式的返回 new 创建出来的实例对象。而如果用 return 显示的返回：{}、[]、RegExp、Data、Function 时，
 *  则会替代 new 调用的默认返回值 this，也就是说会替换新创建的实例对象。
 * 
 *  5，如果函数体是在严格模式下时，则不会绑定 this 至全局对象，因为严格模式下，默认的 this 指向 undefined。
 */