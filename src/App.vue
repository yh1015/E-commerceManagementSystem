<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from 'components/content/login/Login'

// 导入全局样式表
import 'assets/css/globle.css'

export default {
  name: "App",
  components: {
    Login
  }
};
</script>

<style scoped>
</style>

