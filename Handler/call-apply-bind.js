// 手写call
Function.prototype.myCall = function (ctx, ...args) {
  console.log(ctx); // person2:{name: 'person2'}
  console.log(this); // say方法
  // 设置默认的this
  ctx = arguments[0] || window;
  // 若传入的对象是字符串，需要装箱
  if (ctx instanceof String) {
    ctx = new String(ctx);
  }
  // 声明一个独有的Symbol属性，防止覆盖
  const fun = Symbol('fun');
  // 为传入对象设置函数
  ctx[fun] = this;
  // 执行函数并返回结果
  const result = ctx[fun](...args);
  // 删除我们设置的属性
  delete ctx[fun];
  // 返回结果
  return result;
}

// 测试
function test(name) {
  console.log(name);
  console.log(this.name);
}

const obj = {
  name: 'dnhyxc'
}

test.myCall(obj, '新名字');


// 手写apply
Function.prototype.myApply = function (ctx, args) {
  // 设置默认的this
  ctx = arguments[0] || window
  // 若传入的对象是字符串，需要装箱
  if (ctx instanceof String) {
    ctx = new String(ctx)
  }
  // 声明一个独有的Symbol属性，防止覆盖
  const fun = Symbol('fun')
  // 为传入对象设置函数
  ctx[fun] = this
  // 执行函数并返回结果
  let result
  if (args) {
    result = ctx[fun](...args)
  } else {
    result = ctx[fun]()
  }
  // 删除我们设置的属性
  delete ctx[fun]
  // 返回结果
  return result
}

// 测试
let person = {
  name: 'person1',
  say(arg1, arg2) {
    return this.name + ' ' + arg1 + ' ' + arg2
  }
}

let person2 = {
  name: 'person2'
}

let res = person.say.myApply(person2, [78, 89]); // person2 78 89


// 手写bind
Function.prototype.myBind = function (ctx, ...args) {
  // 设置默认的this
  ctx = arguments[0] || window;
  // 记录当前this
  const _this = this
  // 返回一个函数
  return function (...args2) {
    // 声明一个独有的Symbol属性，防止覆盖
    const fun = Symbol('fun')
    // 为传入对象设置函数
    ctx[fun] = _this
    // 执行函数并记录结果
    let result = args.length !== 0 ? ctx[fun](...args) : ctx[fun](...args2)
    // 删除我们设置的属性
    delete ctx[fun]
    // 返回调用结果
    return result
  }
}

// 测试
let person3 = {
  name: 'person1',
  say(arg1, arg2) {
    return this.name + ' ' + arg1 + ' ' + arg2
  }
}

let person4 = {
  name: 'person2'
}

let res1 = person.say.myBind(person3, 77, 78)();
let res2 = person.say.myBind(person4)(77, 78);
console.log(res1, res2);  // person2 77 78 person2 77 78
console.log('>>>>>((手动分割线，手写call、apply、bind))>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')