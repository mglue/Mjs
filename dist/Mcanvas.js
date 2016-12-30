'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by 苗高林 on 2016/12/23.
 */
var Mcanvas2d = function () {
    /**
     * 初始化画布
     * @param canObj canvans的js元素对象
     * @param opts 画布设置参数对象
     * opts = {
     * width: "画布宽度",
     * height: "画布高度"
     * }
     */
    function Mcanvas2d(canObj, opts) {
        _classCallCheck(this, Mcanvas2d);

        opts || (opts = {});
        this.width = opts.width || '100';
        this.height = opts.height || '100';
        this.canvas = canObj;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        //画布中心坐标
        this.x = parseInt(this.width / 2);
        this.y = parseInt(this.height / 2);
        //计算最小半径
        if (this.width > this.height) {
            this.radius = parseInt(this.height / 2);
        } else {
            this.radius = parseInt(this.width / 2);
        }
    }

    /**
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
     */


    _createClass(Mcanvas2d, [{
        key: 'drawLoop',
        value: function drawLoop(opts) {
            //圆形画布
            this.canvas.style.cssText = "border-radius: 100%";
            opts || (opts = {});
            var x = opts.x || opts.x === 0 ? opts.x : this.x,
                y = opts.y || opts.y === 0 ? opts.y : this.y,
                percent = opts.percent || opts.percent === 0 ? opts.percent : 1,
                lineWidth = opts.lineWidth ? opts.lineWidth : 1,
                radius = opts.radius ? opts.radius : this.radius,
                lineBgColor = opts.lineBgColor ? opts.lineBgColor : '#eee',
                lineColor = opts.lineColor ? opts.lineColor : '#ffb432',
                startPosition = opts.startPosition ? opts.startPosition : 'top',
                colorType = opts.colorType ? opts.colorType : 1;
            //校正半径，保证圆环在画布中
            radius -= lineWidth / 2;
            var offsetRadium = void 0; //偏移弧度
            if (startPosition == 'top') {
                offsetRadium = -Math.PI / 2;
            } else if (startPosition == 'right') {
                offsetRadium = 0;
            } else if (startPosition == 'bottom') {
                offsetRadium = Math.PI / 2;
            } else if (startPosition == 'left') {
                offsetRadium = Math.PI;
            }

            //绘制背景线条
            this.ctx.lineWidth = lineWidth;
            this.ctx.beginPath();
            this.ctx.strokeStyle = lineBgColor;
            this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
            this._stroke();

            var tmpStyleColor = void 0;
            if (colorType == 1) {
                //实色（默认）
                tmpStyleColor = lineColor;
            } else if (colorType == 2) {
                //径向渐变
                var radialGradientArr = opts.radialGradientArr ? opts.radialGradientArr : [[0.9, "rgb(249,163,12)"], [1, "rgb(255,202,110)"]];
                var radial = this.ctx.createRadialGradient(x, y, 0, x, y, radius);

                if (radialGradientArr instanceof Array) {
                    for (var i = 0; i < radialGradientArr.length; i++) {
                        radial.addColorStop(radialGradientArr[i][0], radialGradientArr[i][1]);
                    }
                } else {
                    throw "radialGradientArr类型不正确，应为: [[offset, color], [offset, color], [offset, color]]r";
                }

                tmpStyleColor = radial;
            }
            this.ctx.strokeStyle = tmpStyleColor;
            this.ctx.arc(x, y, radius, offsetRadium, Math.PI * 2 * percent + offsetRadium, false); // 绘制
            this._stroke();
        }

        /**
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
         */

    }, {
        key: 'drawText',
        value: function drawText(text, opts) {
            opts || (opts = {});
            var color = opts.color ? opts.color : 'black',
                font = opts.font ? opts.font : '16px Arial',
                x = opts.x || opts.x === 0 ? opts.x : this.x,
                y = opts.y || opts.y === 0 ? opts.y : this.y,
                textAlign = opts.textAlign ? opts.textAlign : 'center',
                textBaseline = opts.textBaseline ? opts.textBaseline : 'middle';

            this.ctx.fillStyle = color; //设置字体颜色
            this.ctx.font = font; //设置字体大小和字体

            //绘制字体，并且指定位置
            this.ctx.textAlign = textAlign;
            this.ctx.textBaseline = textBaseline;

            this.ctx.fillText(text, x, y, this.width);
        }

        /**
         * 使用更优化的定时器，requestAnimationFrame（兼容setTimeout）
         * @param callback
         */
        /*
        drawFrame(num, offset){
            let startObj, clearObj, i;
              if (window.requestAnimationFrame) {
                startObj = requestAnimationFrame;
                clearObj = cancelAnimationFrame;
                startObj(this.drawFrame);
            } else {
                startObj = setTimeout;
                clearObj = clearTimeout;
                startObj(this.drawFrame,100);
            }
              i += offset;
            if( i > num){
                clearObj(startObj);
            }
        }
        */

        /**
         * 重置stroke
         */

    }, {
        key: '_stroke',
        value: function _stroke() {
            this.ctx.stroke();
            this.ctx.closePath();
            this.ctx.restore();
            //绘制主线条
            this.ctx.beginPath();
        }
    }]);

    return Mcanvas2d;
}();
//# sourceMappingURL=Mcanvas.js.map