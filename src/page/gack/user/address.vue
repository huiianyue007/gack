<template>
  <div class="address">
    <div class="title oh address_title">
      {{title}}
      <el-button class = 'fr' type = 'primary' @click.native = 'routeTo("新增地址")'>新增收货地址</el-button>
    </div>
    <div class="no_data_lay" v-if = '!addressList.length'>
      <layout>
      </layout>
    </div>
    <div class="li" v-for = '(item, key) in addressList' v-if = 'addressList.length'  :class = '{active: item.isdefault === "1"}'>
      <p>收件人: {{item.name}}</p>
      <p>电话: {{  item.telephone }}</p>
      <p>地址： {{ item.address }}</p>
      <div class="close" @click = 'delAddress(item.id)'>关闭</div>
      <div class="edit">
        <el-button size = 'small' @click.native = 'setDefault(item.id)' v-if = 'item.isdefault === "0"'>设置为默认地址</el-button>
        <el-button size = 'small' @click.native = 'routeTo("编辑地址", key, item.id)'>编辑</el-button>
      </div>
    </div>
    <!--<el-button class="view text-center block" v-if = '!addressList.length'>暂无更多地址信息</el-button>-->
  </div>
</template>
<script>
  import store from 'store'
  export default {
    async beforeRouteEnter (from, to, next) {
      if (store.state.userid) {
        if (!store.state.userInfo) {
          await store.dispatch('findById', store.state.userid.id)
          next()
        } else {
          next()
        }
      } else {
        next('/login/0')
      }
    },
    data: () => ({
      title: '地址管理'
    }),
    methods: {
      delAddress (key) {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/deleteAddress', {}, {
          params: {
            id: key
          }
        }).then(() => {
          this.$store.dispatch('findById', this.user.id)
        }).catch(() => {
        })
      },
      routeTo (opt, key, id) {
        let query = {
          title: opt,
          id
        }
        if (typeof key !== 'undefined') {
          query.index = key
        }
        this.$router.push({
          path: '/user/editaddress',
          query: query
        })
      },
      setDefault (key) {
        this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/updateAddress', {}, {
          params: {
            id: key,
            isdefault: '1'
          }
        }).then(() => {
          this.$store.dispatch('findById', this.user.id)
        }).catch(error => {
        })
      }
    },
    computed: {
      user () {
        return this.$store.state.userInfo
      },
      addressList () {
        if (this.user) {
          return this.user.addresses
        }
      }
    }
  }
</script>
<style scoped>
  .address {
    background: #fff;
    padding:15px 20px;
    box-sizing: border-box;
  }
  .address_title{
    border-bottom: 1px solid #efefef;
    padding: 5px 0;
  }
  .address .li{
    border: 1px dashed #f0f0f0;
    padding: 5px 15px;
    margin-top: 10px;
    position:relative;
  }
  .address .li p{
    line-height: 3em
  }
  .address .li.active{
    border: 1px dashed #ff0000;
  }
  .address .li .close{
    position:absolute;
    right: 15px;
    top:15px;
  }
  .address .li .edit{
    position:absolute;
    right: 15px;
    bottom: 20px;
  }
  .view{
    margin-top: 10px;
  }
</style>
