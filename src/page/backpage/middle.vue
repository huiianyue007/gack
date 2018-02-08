<template>
    <div>
        <div class="middle">
            <img src="../../assets/images/backImg/middle.png">
            <span class="btn" @click="sellerMe">立即赚钱</span>
        </div>
    </div>
</template>
<script>

export default {
    name: 'error',
    data() {
        return {
            msg: ''
        }
    },
    methods: {
        sellerMe() {
            this.$router.push('/information');
        }
    }
}
</script>
<style  scoped>
.middle {
    position: relative;
    width: 100%;
    height: auto;
}

.middle img {
    width: 100%;
    display: block;
}





/**
 * $Bottom
 **/

.middle .btn {
    /*margin: 15px 15px 0;
  padding: .6em 1.1em;
  font-size: 26px;
  font-size: 1.625rem;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #c7000a;
  border-radius: 3px;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  -webkit-box-shadow: 0 0 0 -2px #cff09e, 0 0 0 -1px #c7000a;
  box-shadow: 0 0 0 -2px #cff09e, 0 0 0 -1px #c7000a;
  border: none;*/
    position: absolute;
    color: #9a7cba;
    left: 50%;
    top: 36%;
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: -80px;
    overflow: hidden;
    color: #F8D7D7;
    font-size: 20px;
    cursor: pointer;
    font-family: '微软雅黑';
    border: 2px solid #F8D7D7;
    -webkit-transition: -webkit-box-shadow .3s;
    transition: box-shadow .3s;
    -webkit-transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);
    transition-timing-function: cubic-bezier(0.6, 4, 0.3, 0.8);
    -webkit-animation: gelatine 0.5s infinite;
    animation: gelatine 0.5s infinite;
}

@media screen and (max-width: 1000px) {
    .middle .btn {
        width: 100px;
        height: 30px;
        margin-left: -60px;
        font-size: 14px;
        line-height: 30px;
    }
}

.middle .btn:hover {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
    /* Safari 和 Chrome */
}





/*.btn:active {
    background: #c7000a;
    -webkit-transition-duration: 0;
    transition-duration: 0;
    -webkit-box-shadow: 0 0 0 2px #c7000a, 0 0 0 2px #c7000a;
    box-shadow: 0 0 0 2px #c7000a, 0 0 0 2px #c7000a;
}*/


/**
 * $keyframes \ gelatine
 **/

@keyframes gelatine {
    from,
    to {
        -webkit-transform: scale(1, 1);
        transform: scale(1, 1);
    }

    25% {
        -webkit-transform: scale(0.9, 1.1);
        transform: scale(0.9, 1.1);
    }

    50% {
        -webkit-transform: scale(1.1, 0.9);
        transform: scale(1.1, 0.9);
    }

    75% {
        -webkit-transform: scale(0.95, 1.05);
        transform: scale(0.95, 1.05);
    }

    from,
    to {
        -webkit-transform: scale(1, 1);
        transform: scale(1, 1);
    }

    25% {
        -webkit-transform: scale(0.9, 1.1);
        transform: scale(0.9, 1.1);
    }

    50% {
        -webkit-transform: scale(1.1, 0.9);
        transform: scale(1.1, 0.9);
    }

    75% {
        -webkit-transform: scale(0.95, 1.05);
        transform: scale(0.95, 1.05);
    }
}

@-webkit-keyframes gelatine {
    from,
    to {
        -webkit-transform: scale(1, 1);
        transform: scale(1, 1);
    }

    25% {
        -webkit-transform: scale(0.9, 1.1);
        transform: scale(0.9, 1.1);
    }

    50% {
        -webkit-transform: scale(1.1, 0.9);
        transform: scale(1.1, 0.9);
    }

    75% {
        -webkit-transform: scale(0.95, 1.05);
        transform: scale(0.95, 1.05);
    }

    from,
    to {
        -webkit-transform: scale(1, 1);
        transform: scale(1, 1);
    }

    25% {
        -webkit-transform: scale(0.9, 1.1);
        transform: scale(0.9, 1.1);
    }

    50% {
        -webkit-transform: scale(1.1, 0.9);
        transform: scale(1.1, 0.9);
    }

    75% {
        -webkit-transform: scale(0.95, 1.05);
        transform: scale(0.95, 1.05);
    }
}
</style>
