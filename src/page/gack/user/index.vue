<template>
  <div class="user" v-if = 'user'>
    <div class="content">
      <el-form label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item label="头像">
          <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
            <img v-if="formLabelAlign.portraitFile || user.portrait" :src="formLabelAlign.portraitFile || user.portrait" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formLabelAlign.nickname"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker :editable = 'false' type="date" placeholder="选择日期" v-model="formLabelAlign.birthday" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号">
          {{ user.username }}
        </el-form-item>
        <p class = 'regist_time'>
          注册日期&nbsp;&nbsp;{{ user.createTime | time }}
        </p>
        <el-button class = 'submit' @click.native = 'save' type = 'primary'>保存</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
  import store from 'store'
  export default {
    name: 'user_index',
    data () {
      return {
        formLabelAlign: {
          portraitFile: '',
          nickname: '',
          birthday: ''
        }
      }
    },
    filters: {
      time (opt) {
        let date = new Date(opt)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}:${date.getSeconds() < 10 ? '0' : ''}${date.getSeconds()}`
      }
    },
    watch: {
      user (val) {
        if (val) {
          this.formLabelAlign = val
        }
      }
    },
    mounted () {
      if (this.user) {
        for (let key in this.formLabelAlign) {
          this.formLabelAlign[key] = this.user[key]
        }
      }
    },
    methods: {
      save () {
        if (this.formLabelAlign.birthday) {
          let birthday = new Date(this.formLabelAlign.birthday).getTime()
          let now = new Date().getTime()
          if (birthday > now) {
            this.$message.error('出生日期不能晚于现在')
            return false
          }
        }
        this.formLabelAlign = Object.assign(this.user, this.formLabelAlign)
        if (this.formLabelAlign.portraitFile) {
          this.formLabelAlign.portraitFile = this.formLabelAlign.portraitFile.replace(/https/ig, 'http')
        } else if (this.user.portrait) {
          this.formLabelAlign.portraitFile = this.user.portrait.replace(/https/ig, 'http')
        }
        this.formLabelAlign.userid = this.user.id
        this.$htAjax.post(`${this.$config.gack}/guoanmaker/personal/user/updateUser`, {}, {
          params: this.formLabelAlign
        }).then(({data}) => {
          this.$message({
            type: 'success',
            message: '信息保存成功'
          })
          this.$store.commit('setUserInfo',data.data)
        }).catch(error => {
          this.$message.error('信息保存失败')
        })
      },
      handleAvatarSuccess(res, file) {
//        this.formLabelAlign.portraitFile = res.data;
        this.$set(this.formLabelAlign, 'portraitFile', res.data)
      },
      beforeAvatarUpload(file) {
        const isImg = file.type;
        var isJPG = false;
        if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp') {
          this.$message.error('上传头像图片只能是 JPG/PNG/BMP!');
          isJPG = false;
        } else {
          isJPG = true;
        }
        const isLt2M = file.size / 1024 / 1024 < 3;

        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 3MB!');
        }
        return isJPG && isLt2M;
      }
    },
    computed: {
      user () {
        return this.$store.state.userInfo
      }
    }
  }
</script>
<style scoped>
  .user {
    background: #fff;
    width:100%;
    padding: 10px;
  }
  .content {
    padding:20px 10px 10px;
    width:30%;
  }
  .regist_time{
    text-align:center;
  }
  .submit {
    display:block;
    margin: 10px auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #e0e0e0;
    border-radius: 5px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

