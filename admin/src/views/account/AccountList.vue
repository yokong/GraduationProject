<template>
  <div class="container">
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号</el-breadcrumb-item>
      <el-breadcrumb-item>账号列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>
    <!-- :data="items"  -->
    <!-- 搜索框 -->
    <el-row style="margin-bottom:20px" class="my-search">
      <el-col :span="4">
        <el-input
          @keyup.enter.native="search"
          v-model="searchData"
          placeholder="输入姓名或账号搜索"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="batchDelete">批量删除</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="success" @click="exportToExcel">导出为excle</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据  -->
    <el-table border @selection-change="handleSelectionChange" :data="list">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" width="70">
        <template scope="scope">
          <span>{{ scope.$index + (currentPage - 1) * pageSize + 1 }} </span>
        </template>
      </el-table-column>

      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-tag type="info">
            {{
              scope.row.authority == "1"
                ? "安装工程师"
                : scope.row.authority == "2"
                ? "技术主管"
                : "管理员"
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
    <!-- 导出用表格  隐藏-->
    <el-table v-show="false" id="account_table" border :data="items">
      <el-table-column label="序号" type="index" align="center" width="70">
      </el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="phoneNumber" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <el-tag type="info">
            {{
              scope.row.authority == "1"
                ? "安装工程师"
                : scope.row.authority == "2"
                ? "技术主管"
                : "管理员"
            }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
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
import FileSaver from "file-saver";
import XLSX from "xlsx";
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
      currentPage: 1,
      // 批量删除的数组
      idList: [],
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
        type: "error",
      }).then(async () => {
        const res = await this.$http.delete(`rest/accounts/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
    async batchDelete() {
      this.$confirm(`此操作将批量删除选择项目, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      }).then(async () => {
        const idList = this.idList.map((item) => String(item._id));
        const res = await this.$http.get(`rest/accounts/delete-many/${idList}`);
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
    },
    // 导出表格方法
    exportToExcel() {
      // let ignore = document.getElementById("ignore");
      // console.log("ignore", ignore);

      // const et = XLSX.utils.table_to_book(
      //   document.getElementById("account_table")
      // );

      const et = XLSX.utils.table_to_book(
        document.getElementById("account_table")
      ); //此处传入table的DOM节点

      const etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], {
            type: "application/octet-stream",
          }),
          `account-table-${this.$moment().format("YYYY-MM-DD HH-MM-SS")}.xlsx`
        ); //trade-publish.xlsx 为导出的文件名
        this.$message.success("导出成功");
      } catch (e) {
        if (typeof console !== "undefined") {
          console.log(e, etout);
        }
      }
      return etout;
    },
    // 详细导出
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
