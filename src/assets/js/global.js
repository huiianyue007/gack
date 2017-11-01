export default {
  computed: {
    user () {
      if (this.$store) {
        return this.$store.state.userInfo
      }
    },
    address () {
      if (!this.$store) return false
      let position = this.$store.state.position ? this.$store.state.position : {
        inCity: {
          code: '110100',
          id: '1',
          name: '北京市',
          provinceCode: '110000'
        },
        openCity: []
      }
      return position
    }
  },
  methods: {
    resetVerCode () {
      // var code = ""; //在全局 定义验证码
      // var codeLength = 4;//验证码的长度
      // var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 's', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符，当然也可以用中文的
      // for (var i = 0; i < codeLength; i++) {
      //   var charIndex = Math.floor(Math.random() * 62);
      //   code += selectChar[charIndex];
      // }
      // return code
      return new Promise((resolve, reject) => {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/getPicCode').then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
