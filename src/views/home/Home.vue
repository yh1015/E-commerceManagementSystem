<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="~assets/img/qq.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边栏区域 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <!-- 折叠 -->
        <div class="toggle-button" @click="toggleMenu">
          <i :class="isCollapse ? toggleIcon.left : toggleIcon.right"></i>
        </div>
        <!-- 菜单区域 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse = "isCollapse"
          :collapse-transition = "false"
          router
          :default-active = "activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]" class="icon"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index=" '/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavstatus('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu icon"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getPermissionMenus } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      menulist: [],
      iconsObj: {
        125: "el-icon-user-solid",
        103: "el-icon-setting",
        101: "el-icon-s-goods",
        102: "el-icon-s-comment",
        145: "el-icon-document",
      },
      // 折叠图标
      toggleIcon: {
        left: 'el-icon-s-fold',
        right: 'el-icon-s-unfold'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的地址
      activePath: '',
    };
  },
  created() {
    this.getPermissionMenus();
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 请求权限菜单
    getPermissionMenus() {
      getPermissionMenus().then((res) => {
        console.log(res);
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.menulist = res.data;
      });
    },
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 切换菜单
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
    // 保存菜单路由的值
    saveNavstatus(activePath) {
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.el-header span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.icon {
  margin-right: 10px;
}
.el-menu {
  border-right: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
