<template>
  <div class="body">
    <div class="zhiyin">
      <div class="title">新手指导</div>
      <div class="zhi_content">
        <div class="zhiyin_img" id='zhiyin'></div>
      </div>
      <div id="scroll">
        <div id="scroll_bar"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      var flag = false
      var sflag = false
      var distance = 0
      var sdistance = 0
      var old = 0
      var sold = 0
      var parentWidth = $('.zhi_content').width() * 95 / 100
      var scrollWidth = $('#scroll').width()
      var minDistance = 1035 - $('.zhi_content').width() * 95 / 100
      var scrollDistance = (scrollWidth - 120) * (parentWidth / parentWidth)
      var scrollDom = $('#scroll_bar')
      var zhiyinDom = $('#zhiyin')
      var canDrag = scrollDistance / minDistance
      $('#zhiyin').mousedown(function(e) {
        old = e.clientX
        flag = true
        var _this = this
        $(document).mousemove(function(e) {
          if(flag && distance >= -minDistance && distance <= 0) {
            distance += e.clientX - old
            $(_this).css({
              'transform': 'translateX(' + distance + 'px)'
            })
            $(scrollDom).css({
              'transform': 'translateX(' + (-distance * canDrag) + 'px)'
            })
            old = e.clientX
          } else if(distance > 0) {
            distance = 0
          } else if(distance < -minDistance) {
            distance = -minDistance
          }
        })
        $(document).mouseup(function() {
          flag = false
          sflag = false
        })
      })
      var canscroll = minDistance / scrollDistance
      $('#scroll_bar').mousedown(function(e) {
        sold = e.clientX
        sflag = true
        var _this = this
        $(document).mousemove(function(e) {
          if(sflag && sdistance <= scrollDistance && sdistance >= 0) {
            sdistance += e.clientX - sold
            $(zhiyinDom).css({
              'transform': 'translateX(' + (-canscroll * sdistance) + 'px)'
            })
            $(_this).css({
              'transform': 'translateX(' + sdistance + 'px)'
            })
            sold = e.clientX
          } else if(sdistance < 0) {
            sdistance = 0
          } else if(sdistance > scrollDistance) {
            sdistance = scrollDistance
          }
        })
        $(document).mouseup(function() {
          flag = false
          sflag = false
        })
      })
    }
  }
</script>
<style scoped>
  .body {
    overflow: hidden;
    background: rgb(111, 106, 229);
    height: 55vh;
    position: relative;
  }

  .body .zhiyin {
    color: #fff;
    width: 85%;
    height: 60%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    box-sizing: content-box;
    cursor: pointer;
    border: 3px solid rgba(238, 49, 56, .6);
    border-radius: 15px;
    padding: 10px;
    margin: auto;
  }

  .body .zhiyin .title {
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 15px;
  }

  .body .zhi_content {
    overflow: hidden;
    width: 95%;
    margin: 0 auto;
  }

  .body .zhiyin .zhiyin_img {
    margin: 0 auto;
    background: url('~assets/images/gack/pc-xingshou.png') no-repeat center center/108%;
    width: 1035px;
    padding-bottom: 220px;
  }

  #scroll {
    width: 100%;
    width: 100%;
    height: 2px;
    margin-top: 15px;
    background: rgba(238, 49, 56, .6);
    position: relative;
  }

  #scroll_bar {
    height: 15px;
    width: 120px;
    position: absolute;
    top: -7px;
    background: rgba(69, 77, 202, 1);
    border-radius: 15px;
  }

  @media screen and (min-width: 1448px) {
    #scroll {
      display: none;
    }
  }
</style>
