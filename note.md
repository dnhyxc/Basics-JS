## JavaScript 随笔

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