<template>
  <canvas :width = 'width' :height = 'height'></canvas>
</template>
<script>
  export default {
    props: {
      code: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      }
    },
    mounted () {
      this.init()
    },
    watch: {
      code () {
        this.init()
      }
    },
    methods: {
      init () {
        let ctx = this.$el.getContext('2d')
        ctx.textBaseline = 'middle'
        ctx.fillStyle = this.randomColor(180, 240)
        ctx.fillRect(0, 0, this.width, this.height)
        var len = this.code.length
        for(var i = 0; i < len; i++) {
          ctx.font = '20px SimHei'
          //ctx.font = randomNum(this.options.height/2, this.options.height) + 'px SimHei'; //随机生成字体大小
          ctx.fillStyle = this.randomColor(50, 160) //随机生成字体颜色
          /* ctx.shadowOffsetX = randomNum(-3, 3);
           ctx.shadowOffsetY = randomNum(-3, 3);*/
          ctx.shadowBlur = this.randomNum(-3, 3)
          ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
          var x = this.width / len * i + this.width / len / 4
          var y = this.height / 2
          var deg = this.randomNum(-30, 30)
          /** 设置旋转角度和坐标原点 **/
          ctx.translate(x, y)
          ctx.rotate(deg * Math.PI / 180)
          ctx.fillText(this.code.charAt(i), 0, 0)
          /** 恢复旋转角度和坐标原点 **/
          ctx.rotate(-deg * Math.PI / 180)
          ctx.translate(-x, -y)
        }
        /**绘制干扰线**/
        for(var i = 0; i < len; i++) {
          ctx.strokeStyle = this.randomColor(40, 180);
          ctx.beginPath();
          ctx.moveTo(this.randomNum(0, this.width/2), this.randomNum(0, this.height/2));
          ctx.lineTo(this.randomNum(0, this.width/2), this.randomNum(0, this.height));
          ctx.stroke();
        }
        /**绘制干扰点**/
        for(var i = 0; i < this.width/4; i++) {
          ctx.fillStyle = this.randomColor(0, 255);
          ctx.beginPath();
          ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      },
      randomNum (min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      randomColor (min, max) {
        var r = this.randomNum(min, max)
        var g = this.randomNum(min, max)
        var b = this.randomNum(min, max)
        return `rgb(${r} ,${g}, ${b})`
      }
    }
  }
</script>
