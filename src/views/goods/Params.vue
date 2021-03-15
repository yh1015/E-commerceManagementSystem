<template>
  <div class="params">
    <!-- 面包屑导航 -->
    <breadcrumb :itemName="['首页', '商品管理', '分类参数']" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 选择商品分类区域 -->
      <el-row>
        <el-col class="cat-opt">
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联 -->
          <el-cascader
            v-model="selectdCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>

      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisable"
            @click="addManyParams"
            >添加参数</el-button
          >
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleClose(index, scope.row)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else size="small" @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editParams(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button
            type="primary"
            size="mini"
            :disabled="isDisable"
            @click="addManyParams"
            >添加属性</el-button
          >
          <!-- 静态参数表格 -->
          <el-table :data="onlyTableData" border stripe>
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="handleClose(index, scope.row)"
                  >{{ item }}</el-tag
                >
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button v-else size="small" @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editParams(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="removeParams(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <user-modal
      :title="'添加' + titleText"
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
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="ruleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
    <!-- 编辑参数的对话框 -->
    <user-modal
      :title="'编辑' + titleText"
      :dialogVisible="editDialogVisible"
      @cancel="EditCancel"
      @onSubmit="editOnSubmit"
      width="50%"
    >
      <el-form
        :model="editRuleForm"
        :rules="editRules"
        ref="editRuleForm"
        label-width="100px"
        slot="center"
      >
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editRuleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
  </div>
</template>

<script>
import UserModal from "components/content/modal/UserModal";

import {
  getCateList,
  getParamsList,
  addParams,
  getParamsById,
  putParams,
  deleteParams,
} from "network/goods/params";

export default {
  name: "Params",
  data() {
    return {
      catelist: [],
      selectdCateKeys: "",
      dialogVisible: false,
      editDialogVisible: false,
      ruleForm: {
        attr_name: "",
      },
      editRuleForm: {
        attr_name: "",
      },
      rules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      editRules: {
        attr_name: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
      },
      cateProps: {
        expandTrigger: "hover",
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      activeName: "many",
      // 动态参数数据
      manyTableData: [],
      // 静态参数数据
      onlyTableData: [],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品列表
    getCateList() {
      getCateList().then((res) => {
        if (res.meta.status !== 200) {
          this.$message.error("获取商品分类失败!");
        } else {
          this.catelist = res.data;
        }
      });
    },
    handleChange() {
      this.getParamsData();
    },
    // tab页签点击事件
    handleTabClick(tab, event) {
      this.getParamsData();
    },
    // 获取列表参数
    getParamsData() {
      if (this.selectdCateKeys.length !== 3) {
        this.selectdCateKeys = [];
        this.manyTableData = [];
        this.onlyTableData = []
        return;
      }
      getParamsList(this.cateId, { sel: this.activeName }).then((res) => {
        if (res.meta.status !== 200) {
          this.$message.error("获取参数列表失败");
        } else {
          // this.$message.success("获取参数列表成功");
          res.data.forEach((item) => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
            item.inputVisible = false;
            item.inputValue = "";
          });
          console.log(res);
          if (this.activeName === "many") {
            this.manyTableData = res.data;
          } else {
            this.onlyTableData = res.data;
          }
        }
      });
    },
    // 添加动态参数
    addManyParams() {
      this.dialogVisible = true;
    },
    // 关闭添加参数的对话框
    cancel() {
      this.dialogVisible = false;
      this.$refs.ruleForm.resetFields();
    },
    // 提交添加参数的对话框
    onSubmit() {
      this.$refs.ruleForm.validate((vaild) => {
        if (!vaild) return;
        let par = {
          attr_name: this.ruleForm.attr_name,
          attr_sel: this.activeName,
        };
        addParams(this.cateId, par).then((res) => {
          if (res.meta.status !== 201) {
            return this.$message.error("添加参数失败！");
          } else {
            this.$message.success("添加参数成功！");
            this.dialogVisible = false;
            this.getParamsData();
          }
        });
      });
    },
    // 编辑动态参数或静态参数
    editParams(data) {
      getParamsById(this.cateId, data.attr_id, {
        attr_sel: this.activeName,
      }).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取参数信息失败！");
        } else {
          this.editRuleForm = res.data;
          this.editDialogVisible = true;
        }
      });
    },
    // 关闭 编辑参数的对话框
    EditCancel() {
      this.editDialogVisible = false;
      this.$refs.editRuleForm.resetFields();
    },
    // 提交 编辑参数的对话框
    editOnSubmit() {
      this.$refs.editRuleForm.validate((vaild) => {
        if (!vaild) return;
        putParams(this.cateId, this.editRuleForm.attr_id, {
          attr_name: this.editRuleForm.attr_name,
          attr_sel: this.activeName,
        }).then((res) => {
          if (res.meta.status !== 200) {
            return this.$message.error("编辑参数信息失败！");
          } else {
            this.$message.success("编辑参数信息成功！");
            this.editDialogVisible = false;
            this.getParamsData();
          }
        });
      });
    },
    // 删除参数
    removeParams(data) {
      console.log(data);
      this.$confirm("此操作将永久删除该参数, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          deleteParams(this.cateId, data.attr_id).then((res) => {
            if (res.meta.status !== 200) {
              return this.$message.error("删除参数信息失败！");
            } else {
              this.$message.success("删除参数信息成功！");
              this.getParamsData();
            }
          });
        })
        .catch((err) => {
          this.$message.info("已取消删除");
        });
    },
    // 文本框失去焦点或者按住enter
    handleInputConfirm(data) {
      // 清除不合法的输入
      if (data.inputValue.trim().length === 0) {
        data.inputValue = "";
        data.inputVisible = false;
        return;
      }
      data.attr_vals.push(data.inputValue.trim());
      data.inputVisible = false;
      data.inputValue = "";
      this.saveAttrVals(data);
    },
    // 添加标签按钮
    showInput(data) {
      data.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 删除标签按钮
    handleClose(i, data) {
      data.attr_vals.splice(i,1)
      this.saveAttrVals(data)
    },
    // 保存商品参数
    saveAttrVals(data) {
      let par = {
        attr_name: data.attr_name,
        attr_sel: data.attr_sel,
        attr_vals: data.attr_vals.join(" "),
      };
      putParams(this.cateId, data.attr_id, par).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("修改参数信息失败！");
        } else {
          this.$message.success("修改参数信息成功！");
        }
      });
    },
  },
  computed: {
    isDisable() {
      return this.selectdCateKeys.length !== 3;
    },
    cateId() {
      if (this.selectdCateKeys.length === 3) {
        return this.selectdCateKeys[2];
      }
      return null;
    },
    // 动态计算标题的文本
    titleText() {
      if (this.activeName === "many") {
        return "动态参数";
      } else {
        return "静态参数";
      }
    },
  },
  components: {
    UserModal,
  },
};
</script>

<style scoped>
.cat-opt {
  margin: 15px 0;
}
.el-tag {
  margin: 5px;
}
.input-new-tag {
  width: 120px;
}
</style>
