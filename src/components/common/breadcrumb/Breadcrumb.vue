<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to=" index == 0 ? {path} : ''"  v-for="(item,index) in itemName" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: {
    path: {
      type: String,
      default: '/home'
    },
    itemName: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style scoped>
</style>
