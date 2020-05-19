<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item> 安装报告单</el-breadcrumb-item>
      <el-breadcrumb-item>报告单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row style="margin-bottom:20px" class="mysearch">
      <el-col :span="4">
        <el-input
          @keyup.enter.native="search"
          v-model="searchData"
          placeholder="输入提交人姓名搜索"
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
    <el-table border @selection-change="handleSelectionChange" :data="list">
      <el-table-column :selectable="selectInit" type="selection" width="55">
      </el-table-column>

      <el-table-column label="序号" align="center" width="70">
        <template v-slot="scope">
          <span>{{ scope.$index + (currentPage - 1) * pageSize + 1 }} </span>
        </template>
      </el-table-column>

      <el-table-column prop="company" label="用户单位"></el-table-column>
      <el-table-column prop="code" label="用户编码"></el-table-column>
      <!-- <el-table-column prop="meter.meterName" label="仪表" width="220"></el-table-column> -->
      <el-table-column
        prop="submitter_info[0].name"
        label="提交人"
      ></el-table-column>
      <el-table-column
        prop="supervisor_info[0].name"
        label="提交主管"
      ></el-table-column>
      <el-table-column fixed="right" label="安装报告单状态">
        <template v-slot="scope">
          <el-tag
            :type="scope.row.reportStatus == '未提交' ? 'info' : 'warning'"
            >{{ scope.row.reportStatus }}</el-tag
          >
          <span>{{ scope.row.reportStatus.cssType }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/installationReports/edit/${scope.row._id}`)"
          >
            {{ scope.row.reportStatus != "已通过" ? "编辑" : "查看" }}
          </el-button>
          <el-button
            v-if="scope.row.reportStatus != '已通过'"
            type="text"
            size="small"
            @click="remove(scope.row)"
            >删除</el-button
          >
          <el-button
            v-if="scope.row.reportStatus != '已通过'"
            type="text"
            size="small"
            @click="submit(scope.row)"
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
      // 总共数据书
      total: null,
      // 每页多少条数据
      pageSize: 5,
      // 当前在第几页
      currentPage: 1,
      // 批量删除数据
      idList: [],
    };
  },
  methods: {
    // 查询分类数据方法-fetch
    async fetch() {
      const res = await this.$http.get("rest/installationReports");
      if (localStorage.authority == 3) {
        this.items = res.data;
        this.getList();
      } else {
        this.items = res.data.filter((item, index) => {
          return item.submitter_info[0]._id == localStorage.id;
        });
        this.getList();
      }
    },
    // 删除方法
    async remove(row) {
      this.$confirm(
        `此操作将删除${row.company}的安装服务报告, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(async () => {
        const res = await this.$http.delete(
          `rest/installationReports/${row._id}`
        );
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
    // 批量删除方法
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
        const res = await this.$http.get(
          `rest/installationReports/delete-many/${idList}`
        );
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
    // 已通过 报告单无法删除 所以应禁用复选选项
    selectInit(row, index) {
      if (row.reportStatus == "已通过") {
        return false; //不可勾选
      } else {
        return true; //可勾选
      }
    },
    //提交方法
    async submit(row) {
      this.$confirm(
        `将向提交${row.supervisor_info[0].name}报告单,请确认是否执行`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "警告",
        }
      ).then(async () => {
        console.log(row._id);
        row.reportStatus = "已提交";
        row.submitTime = this.$moment().format("YYYY-MM-DD HH:MM:SS");
        await this.$http.put(`rest/installationReports/${row._id}`, row);
        // const res = await this.$http.put(`rest/installationReports`);
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
  font-size: 1em;
  padding-left: 2rem;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
