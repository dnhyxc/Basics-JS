window.addEventListener('load', () => {
  const box = document.getElementById('box');
  console.log(box);
  const height = box.offsetHeight;
  console.log(height);
  const lineHeight = box.style.lineHeight.slice(0, box.style.lineHeight.length - 2);
  console.log(lineHeight);
  const rowMun = Math.round(height / parseFloat(lineHeight));
  console.log(rowMun);


  const cssStyles = { lineHeight: '22px' };
  const res = isElementCollision(box, 3, cssStyles, true);
  console.log(res);

});


const isElementCollision = (ele, rowCount = 1, cssStyles, removeChild) => {
  if (!ele) {
    return false;
  }
  const clonedNode = ele.cloneNode(true);
  // 给clone的dom增加样式
  clonedNode.style.overflow = 'visible';
  clonedNode.style.display = 'inline-block';
  clonedNode.style.width = 'auto';
  clonedNode.style.whiteSpace = 'nowrap';
  clonedNode.style.visibility = 'hidden';
  // 将传入的css字体样式赋值
  if (cssStyles) {
    Object.keys(cssStyles).forEach((item) => {
      clonedNode.style[item] = cssStyles[item];
    });
  }

  // 给clone的dom增加id属性
  const containerID = 'collision_node_id';
  clonedNode.setAttribute('id', containerID);

  let tmpNode = document.getElementById(containerID);
  let newNode = clonedNode;
  if (tmpNode) {
    document.body.replaceChild(clonedNode, tmpNode);
  } else {
    newNode = document.body.appendChild(clonedNode);
  }
  // 新增的dom宽度与原dom的宽度*限制行数做对比
  console.log(ele.offsetWidth * rowCount, 'ele.offsetWidth * rowCount');
  console.log(newNode.offsetWidth, 'newNode.offsetWidth');
  const differ = newNode.offsetWidth - ele.offsetWidth * rowCount;
  console.log(differ, 'ssssssssssssssss');
  if (removeChild) {
    document.body.removeChild(newNode);
  }
  return differ > 0;
};

/* this.rootElement // 要判断的dom container
* rowCount // 限制行数
* cssStyles // 原dom 字体样式（fontSize，fontWeight，letterSpacing）
* 例 const cssStyles = { fontSize: '26px', fontWeight: 'bold' };
* removeChild // 计算完成后是否删除clone的dom -- 一般都要删除掉
*/
// 调用方法
// isElementCollision(this.rootElement, rowCount, cssStyles, removeChild)