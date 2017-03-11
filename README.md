# Mjs
es6与es5个人插件


* construct(canObj,opts)构造函数

```
 * 初始化画布
 * @param canObj canvans的js元素对象
 * @param opts 画布设置参数对象
 * opts = {
 * width: "画布宽度",
 * height: "画布高度"
 * }
```

* drawLoop(opts) 画圆环进度条方法


```
 * 画圆弧
 * @param opts
 * opts = {
 * x : "圆弧圆心横坐标",
 * y : "圆弧圆心纵坐标",
 * percent: "弧度百分比，例如：0.1，0.3，1",
 * lineWidth: "线条宽度(默认，1)",
 * startPosition: "线条起始位置，备注： top(默认), right, bottom, left",
 * lineBgColor: "背景线条颜色,(默认，#eee)",
 * lineColor: "绘制主线条颜色,(默认, #ffb432)",
 * radialGradientArr:"径向渐变，[[offset, color], [offset, color], [offset, color]]",
 * colorType: "线条颜色类型，1(默认)，实色，2，径向渐变色",
 * radius: "圆环半径"
 * }
```

* drawText(text,opts)  画文本

```
 * 填充文本
 * @param text 文本内容
 * @param opts
 * opts={
 *  color: "文本颜色(默认，black)",
 *  font: "字体样式(默认，16px Arial)",
 *  x: "文本横向位置（默认，在画布水平居中）",
 *  y: "文本纵向位置（默认，在画布垂直居中）",
 *  textAlign: "绘制文本时的当前文本水平基线，(默认, center)"
 *      start	默认。文本在指定的位置开始。
 *      end	文本在指定的位置结束。
 *      center	文本的中心被放置在指定的位置。
 *      left	文本左对齐。
 *      right	文本右对齐。
 *  textBaseline: "绘制文本时的当前文本垂直基线，(默认, middle)"
 *      值	描述
 *      alphabetic	默认。文本基线是普通的字母基线。
 *      top	文本基线是 em 方框的顶端。。
 *      hanging	文本基线是悬挂基线。
 *      middle	文本基线是 em 方框的正中。
 *      ideographic	文本基线是表意基线。
 *      bottom	文本基线是 em 方框的底端。
 * }
```

* 例子
```javascript
var  cvs = new Mcanvas2d(document.getElementById('myCanvas'),{
    width: 200,
    height: 100
});

cvs.drawText('15%', {
    color: "#0ac2b5"
    //font: "20px 微软雅黑",
});
cvs.drawLoop({
    percent: 0.7,//百分比
    lineWidth: 5,//线条宽度
    colorType: 2,//线条颜色类型，2是径向渐变

});
```
