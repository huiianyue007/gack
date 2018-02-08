<template>
  <div class="order">
    <div class="back" @click = '$router.go(-1)'>
      < 返回上一页
    </div>
    <div class="message">
      <div class="title">联系人信息</div>
      <div class="desc">联系人姓名: {{ order.name }}</div>
      <div class="desc">联系电话: {{ order.phonenumber}}</div>
      <el-row>
        <el-col :span="3" class = "desc">需求描述</el-col>
        <el-col :span = "12">{{ order.demand }}</el-col>
      </el-row>
    </div>
    <div class="message">
      <div class="title">发票信息</div>
    </div>
    <div class="message">
      <div class="title">
        订单详细信息
      </div>
      <div class="desc">订单编号：{{order.objectId}}</div>
      <div class="desc">创建时间：{{order.createTime}}</div>
      <div class="desc">付款时间：{{order.transaction}}</div>
      <div class="desc">交易完成时间：{{ order.complete }}</div>
      <div class="title">
        订单内容
      </div>
      <template>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="product"
            label="商品"
            width="180">
          </el-table-column>
            <template slot-scope="scope">
              <img :src="scope.row.imgSrc" alt="">
            </template>
          <el-table-column
            prop="price"
            label="单价"
            width="180">
          </el-table-column>
          <el-table-column
            prop="discount"
            label="优惠券">
          </el-table-column>
          <el-table-column
            prop="number"
            label="数量">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'order-list',
    data: () => ({
      order: {
        name: '罗阳',
        phonenumber: '13611019328',
        demand: `内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内`,
        objectId: '27149-9527',
        createTime: '2017-05-05 18:51:09',
        transaction: '2017-05-05 18:51:09',
        complete: '2017-05-05 18:51:09'
      },
      tableData: [{
        product: {

        }
      }]
    })
  }
</script>
<style scoped>
  .back{
    color: #ff0000;
    line-height:50px;
    font-size:14px;
  }
  .message{
    background:#fff;
    margin:10px 0;
    padding: 15px 20px;
    box-sizing: border-box;
  }
  .message .title {
    margin-bottom: 10px;
  }
  .message .desc{
    text-indent: 2em;
    overflow:hidden;
    line-height:2em;
  }
</style>
