<template>
  <div class="category">
    <!-- 面包屑导航 -->
    <breadcrumb :itemName="['首页', '商品管理', '商品分类']" />
    <el-card>
      <!-- 添加按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCategory">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table
        class="tree-table"
        :data="categoryList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <template slot-scope="scope" slot="isOk">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>

        <template slot-scope="scope" slot="order">
          <el-tag size="small" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="small"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="small" type="warning" v-else>三级</el-tag>
        </template>

        <template slot-scope="scope" slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="editCategory(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteCategory(scope.row)"
            >删除</el-button
          >
        </template>
      </tree-table>
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
      <!-- 添加商品提示框 -->
      <add-category
        :dialogVisible="isShowAddCategory"
        @cancel="cancelAddCategory"
        @onSubmit="onSubmitAddCategory"
        :options="parentCategoryList"
        :cascaderProps="cascaderProps"
        ref="addCategory"
      />
      <!-- 编辑商品提示框 -->
      <edit-category 
        :dialogVisible="isShowEditCategory"
        :ruleForm="editRuleForm"
        @cancel="editCategoryCancel"
        @onSubmit="editCategoryOnSubmit"
      />
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/breadcrumb/Breadcrumb";
import AddCategory from "./childrenComp/AddCategory"
import EditCategory from "./childrenComp/EditCategory"
import { getCategory,getParentCategory, getCategoryById,putCategoryById, deleteCategoryById} from "network/goods/category";

export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
      parentCategoryList: [],
      editRuleForm: {},
      isShowAddCategory: false,
      isShowEditCategory: false,
      total: 0,
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // 查询条件
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isOk",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    // 获取商品列表
    getCategoryList() {
      getCategory(this.queryInfo).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品分类失败！");
        } else {
          this.$message.success("获取商品分类成功！");
          this.categoryList = res.data.result;
          this.total = res.data.total;
        }
      });
    },
    // 监听pageSize变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCategoryList();
    },
    // 监听pagenumb变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getCategoryList();
    },
    // 添加商品
    addCategory() {
      this.isShowAddCategory = true
      this.getParentCategory();
    },
    // 添加商品 关闭弹出框
    cancelAddCategory() {
      this.isShowAddCategory = false
    },
    // 添加商品 确定弹出框
    onSubmitAddCategory() {
      this.getCategoryList();
      this.isShowAddCategory = false
    },
    // 获取父级分类的数据列表
    getParentCategory() {
      getParentCategory().then(res =>{
        if(res.meta.status !== 200) {
          return this.$message.error('获取父级列表失败！')
        }else{
          console.log(res)
          this.parentCategoryList = res.data
        }
      })
    },
    // 编辑按钮
    editCategory(data) {
      this.isShowEditCategory = true
      getCategoryById(data.cat_id).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error("获取商品失败！");
        } else {
          this.$message.success("获取商品成功！");
          this.editRuleForm = res.data
        }
      })
    },
    editCategoryCancel() {
      this.isShowEditCategory = false
    },
    editCategoryOnSubmit() {
      putCategoryById(this.editRuleForm.cat_id,{cat_name:this.editRuleForm.cat_name}).then(res => {
        if (res.meta.status !== 200) {
          return this.$message.error("编辑商品失败！");
        } else {
          this.$message.success("编辑商品成功！");
          this.isShowEditCategory = false;
          this.getCategoryList();
        }
      })
    },
    deleteCategory(data) {
       this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(res => {
          deleteCategoryById(data.cat_id).then(res => {
            console.log(res)
            if (res.meta.status !== 200) {
              this.$message.error("删除商品信息失败");
            } else {
              this.getCategoryList();
              this.$message.success("删除商品信息成功");
            }
          });
        })
        .catch(err => {
          this.$message.info("已取消删除");
        });
    },
  },
  components: {
    Breadcrumb,
    AddCategory,
    EditCategory
  },
};
</script>

<style scoped>
i {
  font-size: 16px;
}
.tree-table {
  margin-top: 15px;
}
</style>
