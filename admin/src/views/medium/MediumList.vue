<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>介质</el-breadcrumb-item>
      <el-breadcrumb-item>新增介质</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row style="margin-bottom:20px" class="mysearch">
      <el-col :span="4">
        <el-input
          @keyup.enter.native="search"
          v-model="searchData"
          placeholder="输入介质名称"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-search" @click="search"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="3">
        <el-button type="danger" icon="el-icon-delete" @click="batchDelete"
          >批量删除</el-button
        >
      </el-col>
    </el-row>
    <!-- 表格数据 items -->
    <el-table @selection-change="handleSelectionChange" border :data="list">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" width="70">
        <template slot-scope="scope">
          <span>{{ scope.$index + (currentPage - 1) * pageSize + 1 }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="mediumNumber" label="介质编号"></el-table-column>
      <el-table-column prop="mediumName" label="介质名称"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/mediums/edit/${scope.row._id}`)"
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
      ></el-pagination>
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
      // 总共数据
      total: null,
      // 每页多少条数据
      pageSize: 5,
      // 当前在第几页
      currentPage: 1,
      // 批量删除的数据
      idList: [],
    };
  },
  methods: {
    // 查询介质数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/mediums");
      this.items = res.data;
      this.getList();
    },
    // 批量删除数据
    async batchDelete() {
      if (this.idList.length == 0) {
        return this.$message.error("请至少选择一项数据");
      }
      this.$confirm(`此操作将批量删除选择项目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(async () => {
        const idList = this.idList.map((item) => item._id);
        const res = await this.$http.get(`rest/mediums/delete-many/${idList}`);
        this.$message({
          type: "success",
          message: "批量删除成功!",
        });
        this.fetch();
      });
    },
    handleSelectionChange(val) {
      this.idList = val;
    },
    // 删除方法
    async remove(row) {
      this.$confirm(`此操作将删除介质${row.mediumName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/mediums/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
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
    // 搜索
    search() {
      this.page = 1;
      this.getList();
      console.log(this.list);
    },
    // 获取展示数据
    getList() {
      // 通过filter方法过滤得到满足搜索条件的展示数据
      let list = this.items.filter((item, index) => {
        console.log(item.mediumName);
        return item.mediumName.includes(this.searchData);
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
    },
  },
  created() {
    this.fetch();
  },
  watch: {
    searchData(value) {
      if (value == "") {
        this.search();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  color: #606266;
  border-left: 6px solid #409eff;
  padding-left: 2rem;
  font-size: 1em;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
