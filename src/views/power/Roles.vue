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
            <el-row :class="['bd-bottom', index1 == 0 ? 'bd-top' : '','vcenter']" v-for="(item1,index1) in scope.row.children" :key="item1.id">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row :class="[index2 === 0 ? '' : 'bd-top','vcenter']" v-for="(item2,index2) in item1.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag type="success">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag type="warning" v-for="(item3,index3) in item1.children" :key="item3.id">{{item3.authName}}</el-tag>
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
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-settimg" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "components/common/breadcrumb/Breadcrumb";
import { getRolesList } from "network/roles";

export default {
  name: "Roles",
  data() {
    return {
      rolesList: [],
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
  },
  components: {
    Breadcrumb,
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
