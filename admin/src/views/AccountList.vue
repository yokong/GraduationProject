<!--
 * @Author: 赵昱青
 * @Date: 2020-03-08 17:45:48
 * @LastEditTime: 2020-03-08 22:17:09
 * @LastEditors: 赵昱青
 * @Description: 账号列表
 -->
<template>
  <div>
    <h2 style="color:#606266;">账号列表</h2>
    <el-divider></el-divider>

    <!-- 表格数据 items -->
    <el-table :data="items">
      <el-table-column prop="account" label="账号" width="220"></el-table-column>
      <el-table-column prop="name" label="姓名" width="220"></el-table-column>
      <el-table-column label="权限" width="220">
        <template slot-scope="scope">
          <el-tag
            type="info"
          >{{scope.row.authority=='1'?'安装工程师':scope.row.authority=='2'?'技术主管':'管理员'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/accounts/edit/${scope.row._id}`)"
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
  computed: {},
  methods: {
    // 查询分类数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/accounts");
      this.items = res.data;
      console.log(this.items);
    },
    // 删除方法
    async remove(row) {
      this.$confirm(`此操作将删除${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/accounts/${row._id}`);
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
