### constructor

#### 构造函数 this

1，构造函数中，this 总是指向新创建出来的实例对象。

2，如果在严格模式下，this 则指向 undefined。

#### new 关键字

1，构造函数于普通函数的区别就是，构造函数需要使用 new 关键字进行调用。

2，new 关键字调用构造函数时，会经历四个过程，分别为：

<1>，创建一个 Object 实例对象。相当于：

```js
const obj = new Object();
```

<2>，将构造函数中的 this 指向新创建的这个实例对象。

```js
this.name = "dnhyxc";
// 相当于（obj是new Object()创建的对象）
obj.name = "dnhyxc";
```

<3>，自上而下执行构造函数中的代码。

<4>，返回 new 构建出的实例对象。

**注意**：如果被调用的这个构造函数没有显示的 `return` 表达式（仅限于返回对象类型数据的情况）时，则会隐式的返 `this` 对象，也就是 new 创建出来的实例对象。

**说明**：如果使用 return 表达式返回 undefined、null、boolean、number、string 等基本数据类型的时候，则不会替换 new 关键字调用的默认行为，也就是说此时会隐式的返回 new 创建出来的实例对象。而如果用 return 显示的返回 {}、[]、RegExp、Data、Function 时，return 返回的值则会替换 new 调用的默认返回值 this，也就是说会替换 new 新创建出来的实例对象。
