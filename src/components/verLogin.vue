<template>
  <el-dialog
    :visible.sync="dialog"
    width = '375px' @close = 'close'>
    <span><slot></slot></span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="register">注册</el-button>
    <el-button type="primary" @click="login">现在登陆</el-button>
  </span>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dialog: this.dialogVisible
      }
    },
    watch: {
      dialogVisible (val) {
        this.dialog = val
      }
    },
    methods: {
      register () {
        this.$emit('change')
        this.$router.push('/register/0')
      },
      login () {
        this.$emit('change')
        this.$router.push('/login/0')
      },
      close () {
        this.$emit('change')
      }
    }
  }
</script>
