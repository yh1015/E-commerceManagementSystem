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
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'"
              >已付款</el-tag
            >
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editOrder(scope.row)"
            ></el-button>
            <el-button
              type="success"
              icon="el-icon-location"
              size="mini"
              @click="locationOrder(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 编辑弹出框 -->
    <user-modal
      title="修改地址"
      :dialogVisible="dialogVisible"
      @cancel="cancel"
      @onSubmit="onSubmit"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        slot="center"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="ruleForm.address1"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="ruleForm.address2"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
    <!-- 展示物流进度的对话框 -->
    <user-modal
      title="物流进度"
      :dialogVisible="progressVisible"
      @cancel="progressCancel"
      @onSubmit="progressOnSubmit"
      width="50%"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        slot="center"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="ruleForm.address1"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="ruleForm.address2"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
  </div>
</template>


<script>
import { getOrderList, getLogisticsList } from "network/order";
import UserModal from "components/content/modal/UserModal";
import cityData from "./citydata";

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
      dialogVisible: false,
      progressVisible: false,
      ruleForm: {
        address1: [],
        address2: "",
      },
      rules: {
        address1: [
          { required: true, message: "请输入省市区/县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
      },
      cityData,
    };
  },
  components: {
    UserModal,
  },
  created() {
    this.getOrderList();
  },
  methods: {
    // 获取订单列表数据
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
    // 监听pageSize
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    // 监听pageNum
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    // 编辑操作
    editOrder(data) {
      this.dialogVisible = true;
    },
    // 定位操作 接口报错
    locationOrder(data) {
      // getLogisticsList().then(res => {
      //   console.log(res);
      //   if (res.meta.status !== 200) {
      //     return this.$message.error("获取物流信息失败！");
      //   } else {
      //     this.progressVisible = true;
      //   }
      // });
    },
    // 弹出框 取消
    cancel() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    // 弹出框 确定
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return;
      });
    },
    // 展示物流对话框关闭
    progressCancel() {
      this.progressVisible = false;
    },
    // 展示物流对话框确定
    progressOnSubmit() {},
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
