<template>
  <div class="order">
    <breadcrumb :itemName="['首页', '订单管理', '订单列表']" />
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索区域 -->
      <el-row>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getOrderList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- table区域 -->
      <el-table :data="orderList" border stripe> 
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status"></el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{scope.row.create_time | dataFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editOrder(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="locationOrder(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
import { getOrderList } from "network/order";

export default {
  name: "Order",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderList: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      getOrderList(this.queryInfo).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("获取订单列表失败！");
        } else {
          this.total = res.data.total;
          this.orderList = res.data.goods;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
