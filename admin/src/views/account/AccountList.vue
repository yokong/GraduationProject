<!--
 * @Author: 赵昱青
 * @Date: 2020-03-08 17:45:48
 * @LastEditTime: 2020-03-08 22:17:09
 * @LastEditors: 赵昱青
 * @Description: 账号列表
 -->
<template>
  <div class="container">
    <h2 style="color:#606266;">账号列表</h2>
    <el-divider></el-divider>
    <!-- :data="items"  -->
    <!-- 表格数据 items -->
    <el-row style="margin-bottom:20px" class="mysearch">
      <el-col :span="6">
        <el-input
          @keyup.enter.native="search"
          v-model="searchData"
          placeholder="输入姓名或账号搜索"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <el-table :fit="true" :data="list">
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>

      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-tag type="info">{{
            scope.row.authority == "1"
              ? "安装工程师"
              : scope.row.authority == "2"
              ? "技术主管"
              : "管理员"
          }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/accounts/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        class="abc"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      list: [],
      searchData: "",
      // 总共数据书
      total: null,
      // 每页多少条数据
      pageSize: 5,
      // 当前在第几页
      currentPage: 1
    };
  },
  computed: {},
  methods: {
    // 查询分类数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/accounts");
      this.items = res.data;

      this.getList();
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
    },
    search() {
      this.page = 1;
      this.getList();
      console.log(this.list);
    },

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
      console.log(this.list);
      console.log(`当前页: ${val}`);
    },
    getList() {
      // 通过filter方法过滤得到满足搜索条件的展示数据
      let list = this.items.filter((item, index) => {
        return (
          item.name.includes(this.searchData) ||
          item.account.includes(this.searchData)
        );
        // return true;
      });
      this.list = list;
      // 过滤分页
      this.list = list.filter((item, index) => {
        return (
          index < this.currentPage * this.pageSize &&
          index >= this.pageSize * (this.currentPage - 1)
        );
      });
      // 分页的总数据
      this.total = list.length;
      console.log(this.list);
      // 过滤分页
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    searchData(value) {
      if (value == "") {
        this.search();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
