<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar">
        <img src="~assets/logo.png" />
      </div>
      <!-- 登录区域 -->
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px" class="login-form">
        <el-form-item label-width="0" prop="username">
          <el-input v-model="form.username"  prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="password">
          <el-input v-model="form.password"  prefix-icon="el-icon-s-cooperation" show-password></el-input>
        </el-form-item>
        <el-form-item label-width="0" class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getLogin} from 'network/login'

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
    // 重置表单
    reset() {
      this.$refs.ruleForm.resetFields();
    },
    login() {
      this.$refs.ruleForm.validate(valid => {
        if(!valid) return;
        getLogin(this.form).then(res => {
          if(res.meta.status !== 200) {
            this.$message.error('登陆失败！');
          }else{
             this.$message.success(res.meta.msg);
             console.log(res)
            //  将登录成功后的token保存在sessionStorage里
            window.sessionStorage.setItem('token',res.data.token)
            // 通过编程式导航跳转到后台页面
            this.$router.push('/home')
          }
        })
      })
    },
  },
};
</script>

<style scoped>
.login {
  height: 100%;
  background-color: #2b4b6b;
}

.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.avatar {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
} 
</style>
