<template>
  <div class="roles">
    <!-- 面包屑 -->
    <breadcrumb :itemName="['首页', '权限管理', '角色列表']" />
    <el-card>
      <el-row>
        <!-- 添加按钮区域 -->
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bd-bottom', index1 == 0 ? 'bd-top' : '', 'vcenter']"
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, item1.id)"
                  >{{ item1.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row
                  :class="[index2 === 0 ? '' : 'bd-top', 'vcenter']"
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                      v-for="(item3, index3) in item2.children"
                      :key="item3.id"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-settimg"
              size="mini"
              @click="showSetRight(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限展示框 -->
    <user-modal
      title="分配权限"
      :dialogVisible="dialogVisible"
      @cancel="cancel"
      @onSubmit="onSubmit"
      width="50%"
    >
      <!-- 树形控件 -->
      <el-tree
        slot="center"
        :data="rightsList"
        :props="treeProps"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
    </user-modal>
  </div>
</template>

<script>
import Breadcrumb from "components/common/breadcrumb/Breadcrumb";
import userModal from "components/content/modal/UserModal";
import {
  getRolesList,
  deleteRoles,
  getRightsList,
  putRights,
} from "network/roles";

export default {
  name: "Roles",
  data() {
    return {
      rolesList: [],
      dialogVisible: false,
      rightsList: [],
      roleId: "",
      treeProps: {
        label: "authName",
        children: "children",
      },
      defKeys: [105, 116],
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    getRolesList() {
      getRolesList().then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          return this.$message.error("获取角色列表失败！");
        } else {
          this.$message.success("获取角色列表成功！");
          this.rolesList = res.data;
        }
      });
    },
    removeRightById(role, rightId) {
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          deleteRoles(role.id, rightId).then((res) => {
            console.log(res);
            if (res.meta.status !== 200) {
              return this.$message.error("删除失败");
            } else {
              // this.getRolesList()
              role.children = res.data;
            }
          });
        })
        .catch((err) => {
          this.$message.info("已取消删除");
        });
    },
    // 展示用户权限列表
    showSetRight(role) {
      // 获取所有权限列表
      this.roleId = role.id;
      getRightsList().then((res) => {
        console.log(res);
        this.rightsList = res.data;
        this.getLeafKeys(role, this.defKeys);
      });
      this.dialogVisible = true;
    },
    // 通过递归的型式，获取角色下所有三级权限id，并保存到defKeys中
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      }
      node.children.forEach((item) => this.getLeafKeys(item, arr));
    },
    // 关闭对话框
    cancel() {
      this.dialogVisible = false;
      this.defKeys = [];
    },
    // 确定
    onSubmit() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ];
      const idStr = keys.join(",");
      putRights(this.roleId, { rids: idStr }).then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("分配权限失败");
        } else {
          this.defKeys = [];
          this.$message.success("分配权限成功");
          this.getRolesList();
          this.dialogVisible = false
        }
      });
      // console.log(this.$refs.treeRef.getCheckedKeys())
      // console.log(this.$refs.treeRef.getHalfCheckedKeys())
    },
  },
  components: {
    Breadcrumb,
    userModal,
  },
};
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bd-top {
  border-top: 1px solid #eee;
}
.bd-bottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
