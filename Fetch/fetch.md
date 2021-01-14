## Fetch API

### text()

1，该方法用于读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 USVString 格式的 Promise 对象。

```js
async function getData() {
  const res = await fetch('http://xxxxxx');
  res.text().then(res=> {
    console.log(res);
  })
}
```

> 上述代码描述的是通过 url 从 oss 上获取富文本内容（返回的是一个 html 字符串），此时获取到的结果在 body 中，如果不使用 `text()` 方法，那么获取到的数据就是不可读的。因此 text() 可以读取 response 对象，同时将其设置为已读。最后返回一被解析的 html 字符串。
