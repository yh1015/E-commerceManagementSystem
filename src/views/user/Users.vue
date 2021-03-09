<template>
  <div class="users">
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsersList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsersList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="addUsers">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- table区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditModal(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUser(scope.row)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户弹框区域 -->
    <user-modal
      :dialogVisible="dialogVisible"
      width="50%"
      top="25vh"
      title="添加用户"
      @cancel="cancel"
      @onSubmit="onSubmit"
    >
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        slot="center"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
    <!-- 修改用户区域 -->
    <user-modal
      :dialogVisible="editModal"
      width="50%"
      top="25vh"
      title="修改信息"
      @cancel="EditCancel"
      @onSubmit="EditOnSubmit"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
        slot="center"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
    </user-modal>
  </div>
</template>

<script>
import {
  getUsers,
  updataUser,
  addUser,
  getUserInfo,
  editUserInfo,
  deleteUserInfo,
} from "network/users";
import UserModal from "components/content/modal/UserModal";

export default {
  name: "Users",
  data() {
    var checkEmail = (rule, value, callback) => {
      // 验证邮箱的正则
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的邮箱"));
      }
    };
    var checkMobile = (rule, value, callback) => {
      // 验证手机号的正则
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      } else {
        callback(new Error("请输入合法的手机号"));
      }
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      dialogVisible: false,
      editModal: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      editForm: {
        username: "",
        email: "",
        mobile: "",
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          // { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" },
        ],
      },
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          // { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  // 注册组件
  components: {
    UserModal,
  },
  created() {
    this.getUsersList();
  },
  methods: {
    // 请求角色
    getUsersList() {
      getUsers(this.queryInfo).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          this.$message.error("获取用户列表失败！");
        } else {
          this.userList = res.data.users;
          this.total = res.data.total;
        }
      });
    },
    // 监听pageSize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUsersList();
    },
    // 监听 页码值 改变
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUsersList();
    },
    // 监听状态改变
    userStateChanged(userInfo) {
      let params = `/${userInfo.id}/state/${userInfo.mg_state}`;
      updataUser(params).then((res) => {
        console.log(res);
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error("更新用户状态失败！");
        } else {
          this.$message.success("更新用户状态成功！");
        }
      });
    },
    // 添加用户
    addUsers() {
      this.dialogVisible = true;
      console.log(this.dialogVisible);
    },
    // 提交
    onSubmit() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        addUser(this.addForm).then((res) => {
          console.log(res);
          if (res.meta.status !== 201) {
            console.log(this.addForm);
            this.$message.error("添加用户失败！");
          } else {
            this.$message.success("添加用户成功！");
            this.dialogVisible = false;
            this.getUsersList();
          }
        });
      });
    },
    // 关闭对话框
    cancel() {
      this.dialogVisible = false;
      this.$refs.addFormRef.resetFields();
    },

    // 展示用户信息
    showEditModal(data) {
      console.log(data);
      getUserInfo(data.id).then((res) => {
        if (res.meta.status !== 200) {
          this.$message.error("查询用户失败");
        } else {
          console.log(res);
          this.editForm = res.data;
          this.editModal = true;
        }
      });
    },
    // 打开修改用户界面
    EditCancel() {
      this.editModal = false;
      this.$refs.editFormRef.resetFields();
    },
    //修改用户
    EditOnSubmit() {
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        editUserInfo(this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile,
        }).then((res) => {
          if (res.meta.status !== 200) {
            this.$message.error("修改用户信息失败");
          } else {
            console.log(res)
            this.editModal = false;
            this.getUsersList();
            this.$message.success("修改用户信息成功");
          }
        });
      });
    },
    // 删除用户
    removeUser(data) {
      console.log(data)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          deleteUserInfo(data.id).then(res => {
            if (res.meta.status !== 200) {
            this.$message.error("删除用户信息失败");
          } else {
            this.getUsersList();
            this.$message.success("删除用户信息成功");
          }
          })
        }).catch(err => {
          this.$message.info('已取消删除')
        })
    },
  },
};
</script>

<style scoped>
</style>
