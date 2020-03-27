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
    <el-row style="margin-bottom:20px" class="mysearch">
      <el-col :span="6">
        <el-input
          @keyup.enter.native="search"
          v-model="searchData"
          placeholder="输入提交人姓名搜索"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">搜索</el-button>
      </el-col>
    </el-row>
    <!-- 表格数据 items -->
    <el-table :fit="true" :data="list">
      <!-- <el-table-column prop="_id" label="ID" width="220"></el-table-column> -->
      <el-table-column
        prop="company"
        label="用户单位"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="用户编码"
        width="220"
      ></el-table-column>
      <!-- <el-table-column prop="meter.meterName" label="仪表" width="220"></el-table-column> -->
      <el-table-column
        prop="submitter_info[0].name"
        label="提交人"
        width="220"
      ></el-table-column>
      <el-table-column
        prop="supervisor_info[0].name"
        label="提交主管"
        width="220"
      ></el-table-column>
      <el-table-column fixed="right" label="安装报告单状态" width="220">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.reportStatus == '未提交' ? 'info' : 'warning'"
            >{{ scope.row.reportStatus }}</el-tag
          >
          <span>{{ scope.row.reportStatus.cssType }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/erectionReports/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="submit(scope.row)"
            >提交</el-button
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
  methods: {
    // 查询分类数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/erectionReports");
      if (localStorage.authority == 3) {
        this.items = res.data;

        this.getList();
      } else {
        this.items = res.data.filter((item, index) => {
          return item.submitter_info[0]._id == localStorage.id;
        });

        this.getList();
      }

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
    },
    //提交方法
    async submit(row) {
      console.log(row);
      this.$confirm(`将向提交${row.supervisor_info[0].name}报告的`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "警告"
      }).then(async () => {
        console.log(row._id);
        row.reportStatus = "已提交";
        await this.$http.put(`rest/erectionReports/${row._id}`, row);
        // const res = await this.$http.put(`rest/erectionReports`);
        // console.log(123);
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
        return item.submitter_info[0].name.includes(this.searchData);
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
