<template>
  <div class="list">
    <!-- 面包屑区域 -->
    <breadcrumb :itemName="['首页', '商品管理', '商品列表']" />
    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格"
          prop="goods_price"
          width="90px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="80px"
        ></el-table-column>
        <el-table-column label="创建时间" width="150px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editGoods(scope.row)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeGoods(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList, deleteGoods ,getGoodsListById } from "network/goods/list";

export default {
  name: "List",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      goodsList: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品信息
    getGoodsList() {
      getGoodsList(this.queryInfo).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品列表失败！");
        } else {
          this.$message.success("获取商品列表成功！");
          this.goodsList = res.data.goods;
          this.total = res.data.total;
        }
      });
    },
    // 监听pageSize变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    // 监听pageNum变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    // 删除商品
    removeGoods(data) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          deleteGoods(data.goods_id).then( res => {
            if (res.meta.status !== 200) {
              return this.$message.error("删除商品列表失败！");
            } else {
              this.$message.success("删除商品列表成功！");
              this.getGoodsList()
            }
          });
        })
        .catch((err) => {
          this.$message.info("已取消删除");
        });
    },
    // 编辑商品
    editGoods(data) {
      // console.log(data)
      getGoodsListById(data.goods_id).then(res =>{
        console.log(res)
      })
    },
    // 添加商品
    goAddPage() {
      this.$router.push('/goods/add')
    },
  },
  components: {},
};
</script>

<style scoped>
</style>
