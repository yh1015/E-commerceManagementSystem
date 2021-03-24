<template>
  <div class="welcome">
    <el-row>
      <el-col :offset="9" :span="8">
        <el-tag type="success">
          欢迎一起学习 QQ: 1752347692
        </el-tag>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="pie" style="height: 500px"></div>
      </el-col>
      <el-col :span="12">
        <div id="broken" style="height: 500px"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Welcome",
  // 此时,页面上的元素,已经被渲染完毕了
  mounted() {
    this.pieChart();
    this.brokenLine();
  },
  methods: {
    // 饼图
    pieChart() {
      var chartDom = document.getElementById("pie");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 折线图
    brokenLine() {
      var chartDom = document.getElementById("broken");
      var myChart = echarts.init(chartDom);
      var option;

      var data = [];

      for (var i = 0; i <= 360; i++) {
        var t = (i / 180) * Math.PI;
        var r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
      }

      option = {
        title: {
          text: "",
        },
        legend: {
          data: ["line"],
        },
        polar: {
          center: ["50%", "54%"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        angleAxis: {
          type: "value",
          startAngle: 0,
        },
        radiusAxis: {
          min: 0,
        },
        series: [
          {
            coordinateSystem: "polar",
            name: "line",
            type: "line",
            showSymbol: false,
            data: data,
          },
        ],
        animationDuration: 2000,
      };

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.el-row {
  padding-bottom: 25px;
}
.el-tag {
  font-size: 18px;
}
</style>
