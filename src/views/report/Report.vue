<template>
  <div class="report">
    <breadcrumb :itemName="['首页', '数据统计', '数据报表']" />
    <el-card>
      <div id="main" style="width: 750px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
import _ from 'lodash'
import { getReportsList } from "network/reports";
export default {
  name: "Report",
  data() {
    return {
      options: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3",
            },
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
      },
    };
  },
  mounted() {
    this.lineChart();
  },
  methods: {
    // echarts图标

    lineChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));

      // 获取数据
      getReportsList().then((res) => {
        if (res.meta.status !== 200) {
          return this.$message.error("获取折线图数据失败!");
        } else {
          // 使用刚指定的配置项和数据显示图表。
          const result = _.merge(res.data,this.options)
          myChart.setOption(result);
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
