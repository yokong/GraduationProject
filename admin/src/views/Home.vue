<!--
 * @Author: 赵昱青
 * @Date: 2020-02-12 16:06:22
 * @LastEditTime: 2020-03-09 21:44:30
 * @LastEditors: 赵昱青
 * @Description: 主页面
 -->
<template>
  <div class="home">
    <el-row type="flex">
      <el-col :span="8">
        <el-card class>
          <div class="user-info">
            <div class="user-info-avatar">
              <el-avatar :size="150" :src="circleUrl"></el-avatar>
            </div>
            <div class="user-info-detail">
              <h2>赵昱青</h2>
              <span>技术主管</span>
            </div>
          </div>
          <el-divider content-position="left">基础信息</el-divider>
          <div class="contact-information">
            <span>
              <i class="el-icon-phone"></i>
              18309203061
            </span>

            <span>
              <i class="el-icon-message"></i>
              18309203061@qq.com
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row class="right-info">
          <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
              <h4>全部报告单</h4>
            </div>
            <div>{{items.length}}</div>
          </el-card>

          <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
              <h4>已提交</h4>
            </div>
            <div>{{commit}}</div>
          </el-card>
          <el-card shadow="hover" class="box-card">
            <div slot="header" class="clearfix">
              <h4>已通过</h4>
            </div>
            <div>{{pass}}</div>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  data() {
    return {
      items: [],
      circleUrl:
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2686231306,63998876&fm=26&gp=0.jpg"
    };
  },
  methods: {
    async fetchReport() {
      const res = await this.$http.get("rest/erectionReports");
      this.items = res.data;
      console.log(this.items);
    }
  },
  computed: {
    commit() {
      return this.items.filter(item => item.reportStatus == "已提交").length;
    },
    pass() {
      return this.items.filter(item => item.reportStatus == "已通过").length;
    }
  },
  components: {
    // HelloWorld
  },
  created() {
    this.fetchReport();
    const a = [];
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
}
.user-info-avatar {
  flex: 1;
}
.user-info-detail {
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.contact-information {
  display: flex;
  flex-direction: column;
  color: #606266;
}
.contact-information span {
  margin: 0.8rem 0;
}
.contact-information span i {
  margin: 0 0.6rem 0 0;
}

.right-info {
  /* background: pink; */
  height: 180px;
  display: flex;
  justify-content: space-around;
}
.right-info .box-card {
  padding: 0;
  margin: 0 1rem;
  height: 100%;
  flex: 1;
}
div.el-card__header {
  background: yellow;
}
</style>