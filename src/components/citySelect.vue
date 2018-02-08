<template>
  <el-dropdown>
  <span class="el-dropdown-link">
    {{ address.inCity.name }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, key) in address.openCity" :key = "key" @click.native = 'selectCity(item)'>{{ item.cityName }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  export default {
    watch: {
      'address.inCity' (val, oldVal) {
        if (val.code !== oldVal.code) {
          this.initHomePage(val)
        }
      }
    },
    methods: {
      initHomePage (opt) {
        this.$htAjax.post(`${this.$config.activity}/guoanmaker/operator/PCoficial/getAllPc`, {}, {
          params: {
            cityId: opt.code
          }
        }).then(({ data }) => {
          data.data.appsBusinessService = data.data.appsBusinessService.concat(data.data.appsknowledgeService)
          this.$store.commit('setHomePage', data.data)
        }).catch(error => {
          console.log(error)
        })
      },
      selectCity (item) {
        let address = this.address
        address.inCity = {
          code: item.cityId,
          id: item.id,
          name: item.cityName,
          provinceCode: item.provinceId
        }
        this.$store.commit('setLocalPosition', address)
      }
    }
  }
</script>
<style scoped>
  .el-dropdown-link{
    color: #fff;
  }
</style>
