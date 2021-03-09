<template>
<div class="rights">
  <!-- 面包屑 -->
  <breadcrumb  :itemName="['首页','权限管理','权限列表']"/>
  <!-- 卡片视图 -->
  <el-card>
    <el-table :data="rightsList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0' ">一级</el-tag>
            <el-tag type="success" v-else-if= "scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
        </el-table-column>
    </el-table>
  </el-card>
</div>
</template>

<script>
import Breadcrumb from 'components/common/breadcrumb/Breadcrumb'
import {getRightsList} from 'network/rights'

export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList();
  },
  methods: {
    getRightsList() {
      getRightsList().then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          return this.$message.error("获取权限列表失败！");
        } else {
          this.$message.success("获取权限列表成功！");
          this.rightsList = res.data
        }
      })
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>

</style>
