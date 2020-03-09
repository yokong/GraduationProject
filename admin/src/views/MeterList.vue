<!--
 * @Author: 赵昱青
 * @Date: 2020-03-08 11:35:14
 * @LastEditTime: 2020-03-08 22:17:56
 * @LastEditors: 赵昱青
 * @Description: 仪表列表页面
 -->

<template>
  <div>
    <h2 style="color:#606266;">仪器列表</h2>
    <el-divider></el-divider>
    <!-- 表格数据 items -->
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="meterName" label="仪表名称" width="220"></el-table-column>
      <el-table-column prop="meterNumber" label="仪表编号" width="220"></el-table-column>
      <!-- <el-table-column prop="icon" label="图标" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:3em" />
        </template>
      </el-table-column>-->

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/meters/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
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
    // 查询仪表数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/meters");
      this.items = res.data;
    },
    // 删除方法
    async remove(row) {
      this.$confirm(`此操作将删除${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/meters/${row._id}`);
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
