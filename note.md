## JS API

### outerHTML

1，使用 outerHTML 获取指定元素中的所有子元素及文本元素。

```js
<div id="content">
  <p>outerHTML</p>
  <ul>
    <li>Item 1</li>
  </ul>
</div>
const content = document.getElementById('content');
console.log(content.outerHTML);
/*
  执行console.log(content.outerHTML)返回如下：
  <div id="content">
    <p>This is a <strong>paragraph</strong> with a list following it.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
*/
```

2，使用 outerHTML 整体替换指定元素。

```js
<div id="content">
  <p>outerHTML</p>
  <ul>
    <li>Item 1</li>
  </ul>
</div>
content.outerHTML = '<span>替换原来的div</span>';

// 上述代码等价于如下代码
const p = document.createElement("p");
p.appendChild(document.createTextNode("dsadsadsadasda"));
div.parentNode.replaceChild(p, div);
```

> 上述代码中，将会使用 span 标签整体替换原来的 div 标签。

### encodeURIComponent()

1，该方法可以把字符串作为 URI 组件进行编码。

2，该方法不会对 ASCII 字母和数字进行编码，也不会对这些 ASCII 标点符号进行编码： `- _ . ! ~ * ' ( ) `。其他字符（比如：` ; / ? : @ & = + $ , # `这些用于分隔 URI 组件的标点符号），都会被一个或多个十六进制的转义序列替换的。

3，具体使用：

```js
const url = 'http://www.baidu.com'
const res = encodeURIComponent(url);
console.log(res); // http%3A%2F%2Fwww.baidu.com
```

---

## 构造函数相关

### 构造函数 this

1，构造函数中，this 总是指向新创建出来的实例对象。

2，如果在严格模式下，this 则指向 undefined。

### new 关键字

1，构造函数于普通函数的区别就是，构造函数需要使用 new 关键字进行调用。

2，new 关键字调用构造函数时，会经历四个过程，分别为：

<1>，创建一个 Object 实例对象。相当于：

```js
const obj = new Object();
```

<2>，将构造函数中的 this 指向新创建的这个实例对象。

```js
this.name = 'dnhyxc';
// 相当于（obj是new Object()创建的对象）
obj.name = 'dnhyxc';
```

<3>，自上而下执行构造函数中的代码。

<4>，返回 new 构建出的实例对象。

**注意**：如果被调用的这个构造函数没有显示的 `return` 表达式（仅限于返回对象类型数据的情况）时，则会隐式的返 `this` 对象，也就是 new 创建出来的实例对象。

**说明**：如果使用 return 表达式返回 undefined、null、boolean、number、string 等基本数据类型的时候，则不会替换 new 关键字调用的默认行为，也就是说此时会隐式的返回 new 创建出来的实例对象。而如果用 return 显示的返回 {}、[]、RegExp、Data、Function 时，return 返回的值则会替换 new 调用的默认返回值 this，也就是说会替换 new 新创建出来的实例对象。

---

## JS 实现千位分隔符

### 实现方式一

1，首先将数字转为字符串数组，在循环整个数组，每三位添加一个分隔逗号，最后再合并成字符串。

2，由于分隔符在顺序上是从后往前添加的：比如 1234567 添加后是 1,234,567 而不是 123,456,7，所以方便起见可以先把数组倒序排列，添加完之后再将顺序倒回来，就是正常顺序了。

3，**注意**：如果数字带小数的话，要把小数部分分开处理。

```js
function numFormat(num) {
  // 分隔小数点
  num = num.toString().split("."); 
  // 转换成字符数组并且倒序排列
  var arr = num[0].split("").reverse();
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      // 添加分隔符
      res.push(",");
    }
    res.push(arr[i]);
  }
  // 再次倒序成为正确的顺序
  res.reverse(); 
  // 如果有小数的话添加小数部分
  if (num[1]) { 
    res = res.join("").concat("." + num[1]);
  } else {
    res = res.join("");
  }
  return res;
}

var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
```

### 实现方式二

1，使用 JS 自带的 API `toLocaleString()`。

```js
numObj.toLocaleString(locales, options);
```

> locales：缩写语言代码（BCP 47 language tag，例如：cmn-Hans-CN）的字符串或者这些字符串组成的数组。

> options：包含一些或所有的下面属性的类。`decimal => 用于纯数字格式`，`currency => 用于货币格式`，`percent => 用于百分比格式`，`unit => 用于单位格式`。

> 该方法返回这个数字在特定语言环境下的表示字符串。

2，**注意**：该方法在没有指定区域时，返回时用默认的语言环境和默认选项格式化的字符串，所以不同地区数字格式可能会you'y有一定的差异，因此最好确保使用 locales 参数指定了使用的语言。

3，实现数字插入千位符代码如下：

```js
const a = 1234567894532;
const b = 673439.4542;

console.log(a.toLocaleString()); // "1,234,567,894,532"
console.log(b.toLocaleString()); // "673,439.454"  （小数部分四舍五入了）
```

### 实现方式三

1，使用 `RegExp 和 replace()` 方法。

```js
function numFormat(num) {
  // 先提取整数部分
  var res = num.toString().replace(/\d+/, function (n) { 
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ",";
    });
  })
  return res;
}
var a = 1234567894532;
var b = 673439.4542;
console.log(numFormat(a)); // "1,234,567,894,532"
console.log(numFormat(b)); // "673,439.4542"
```

> 上述代码中，对象或者字面量所匹配的内容会被第二个参数的返回值替换。

---

## Array.map() 实现页面展示数组数据

### 上传文件与列表已有文件同时展示

1，处理文件上传文件与原有文件需要同时展示时，需要使用两个互不相干的数组进行展示，即上传文件分为一个数组，已有文件分为一个数组，将这两个数组同时展示在页面上，避免在操作增删改操作时相互影响。

---

## 数组转对象的方式

### 方式一

1，`对象结构`：

```js
const arr = ['arr1', 'arr2', 'arr3'];

const obj = {...arr};
```

### 方式二

1，`for...in 循环`：

```js
const arr = ['arr1', 'arr2', 'arr3'];
const obj = {};

for(let k in arr) {
  obj[k] = arr[k]
}
```

### 方式三

1，`Object.assign()`：

```js
const arr = ['arr1', 'arr2', 'arr3'];

Object.assign({}, arr);
```

### 方式四

1，`Array.reduce()`：

```js
arr.reduce((obj, arr, index) => {
  obj[index] = arr;
  return obj;
}, {})
```

---

## 正则表达式

### 正则表达式中的特殊字符

1，`\`：表示转义符。

2，`^`：表示匹配输入的开始。如果多行标志被设置为 true，那么也匹配换行符后紧跟的位置。

> 例如：/^A/ 并不会匹配 "an A" 中的 "A"，但是会匹配 "An E" 中的 "A"。

3，`$`：表示匹配输入的结束。如果多行标识符被设置为 true，那么也匹配换行符前的位置。

> 例如：/t$/ 并不会匹配 "eater" 中的 "t"，但会匹配 "eat" 中的 "t"。

4，`*`：表示匹配前一个表达式 0 次或多次，等价于 {0,}。

> 例如：/bo*/ 会匹配 "A ghost boooooed" 中的 "booooo" 和 "A bird warbled" 中的 "b"。但是在 "A goat grunted" 中不会匹配任何内容，因为 其中 并没有 "b"，而 "b" 是必须要有的，"o" 可以没有也可以已有。

5，`+`：表示匹配前面一个表达式 1 次或者多次。等价于 {1,}。

> 例如：/a+/ 会匹配 "candy" 中的 "a" 和 "caaaaaandy" 中所有的 "a"，但是在 "cndy" 中不会匹配任何内容。

6，`?`：表示匹配前面一个表达式 0 次或者 1 次。等价于 {0,1}。

> 如果紧跟在任何量词（*、+、? 或 {}）的后面，将会使量词变为非贪婪（匹配尽量少的字符），和缺省使用的贪婪模式（匹配尽可能多的字符）正好相反。
>
> 例如：对 "123abc" 使用 /\d+/ 将会匹配 "123"，而使用 /\d+?/ 则只会匹配到 "1"。

7，`.`：表示默认匹配除换行符之外的任何单个字符。

> 例如：/.n/ 将会匹配 "nsy, an apple is on the tree" 中的 "an" 和 "on"，但是不会匹配 "nay"。
>
> 如果 s（"dotAll"）标志位被设为 true，它会匹配换行符。

8，`(x)`：表示匹配 "x" 并且记住匹配项。其中括号被称为捕获括号。

9，`(?:x)`：表示匹配 "x" 但是不记住匹配项。这种括号叫做非捕获括号。使得你能够定义与正则表达式运算符一起使用的子表达式。

> 例如：/(?:foo){1,2}/，如果表达式是 /foo{1,2}/，{1,2} 将只应用于 "foo" 的最后一个字符 "o"。如果使用非捕获括号，则 {1,2} 会应用于整个 "foo" 单词。

10，`x(?=y)`：表示匹配 "x" 仅仅当 "x" 后面跟着 "y"，这种叫做先行断言。

> 例如：/Jack(?=Sprat)/ 会匹配到 "Jack" 仅当它后面跟着 "Sprat"。/Jack(?=Sprat|Frost)/ 匹配 "Jack" 仅当它后面跟着 "Sprat" 或者是 "Frost"。但是 "Sprat" 或者是 "Frost" 都不是匹配结果的一部分。



