<!--
 * @Author: your name
 * @Date: 2020-02-24 13:23:06
 * @LastEditTime: 2020-03-09 23:04:35
 * @LastEditors: 赵昱青
 * @Description: In User Settings Edit
 * @FilePath: \King\admin\src\views\ErectionReportList.vue
 -->
<template>
  <div>
    <h2 style="color:#606266;">安装报告列表</h2>
    <el-divider></el-divider>

    <!-- 表格数据 items -->
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="company" label="用户单位" width="220"></el-table-column>
      <el-table-column prop="code" label="用户编码" width="220"></el-table-column>
      <el-table-column prop="meter.meterName" label="仪表" width="220"></el-table-column>

      <el-table-column fixed="right" label="安装报告单状态" width="220">
        <template slot-scope="scope">
          <el-tag :type="scope.row.reportStatus=='未提交'?'info':'warning'">{{scope.row.reportStatus}}</el-tag>
          <span>{{scope.row.reportStatus.cssType}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="title" label="称号" width="220"></el-table-column> -->

      <!-- <el-table-column prop="avatar" label="图标" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3em" />
        </template>
      </el-table-column>-->

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/erectionReports/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          <el-button type="text" size="small">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 查询分类数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/erectionReports");
      this.items = res.data;
      // console.log(this.items);
      console.log(res.data);
    },
    // 删除方法
    async remove(row) {
      this.$confirm(
        `此操作将删除${row.company}的安装服务报告, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(async () => {
        const res = await this.$http.delete(`rest/erectionReports/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style></style>
