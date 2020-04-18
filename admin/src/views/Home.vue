<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row :gutter="20" style="padding-bottom:30px">
      <el-col :span="6">
        <el-card header="个人信息">
          <div style="height:300px">
            <el-row style="margin-bottom:30px" class="user-info">
              <el-col :span="12" class="user-info-avatar">
                <el-avatar :size="150" :src="model.avatar"></el-avatar>
              </el-col>
              <el-col :span="12" class="user-info-detail">
                <h2>{{ model.name }}</h2>
                <span>{{
                  model.authority == 1
                    ? "安装工程师"
                    : model.authority == 2
                    ? "技术主管"
                    : "管理员"
                }}</span>
              </el-col>
            </el-row>
            <el-divider content-position="left">联系方式</el-divider>
            <el-row class="contact-information">
              <el-col class="phone" :span="12">
                <span>
                  <i class="el-icon-phone"></i>
                  {{ model.phoneNumber }}
                </span>
              </el-col>
              <el-col class="email" :span="12">
                <span>
                  <i class="el-icon-message"></i>
                  {{ model.email }}
                </span>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col class="changeAvatar" :span="12">
                <el-button>修改头像</el-button>
              </el-col>
              <el-col class="changePassword" :span="12">
                <el-button>修改密码</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card header="通知" class="report">
          <div class="notice-container">
            <el-row
              v-for="item in noticeModel"
              class="text item"
              :key="item._id"
            >
              <el-col :span="6"
                ><span>{{ item.date }}</span></el-col
              >
              <el-col :span="12"
                ><span>{{ item.title }}</span></el-col
              >
              <el-col :span="6"
                ><el-button type="text" @click="showDetail(item._id)"
                  >查看</el-button
                ></el-col
              >
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card header="通知" class="report">
          <div style="height:300px" id="weather-view-he"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="noticeDetail.title"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="margin-bottom:40px">{{ noticeDetail.content }}</div>
      <div style="text-align:right">
        {{ "于 " + noticeDetail.date + " 发布" }}
      </div>
    </el-dialog>

    <el-row margin-top="50px" :gutter="20">
      <el-col :span="6">
        <el-card header="账户数据信息" class="account">
          <div id="account" style="height:300px"></div>
        </el-card>
      </el-col>

      <!-- 仪表使用情况 -->
      <el-col :span="6">
        <el-card header="仪表数据信息" class="account">
          <div id="meter" style="width: 100%;height:300px"></div>
        </el-card>
      </el-col>
      <!-- 介质使用情况 -->
      <el-col :span="6">
        <el-card header="介质数据信息" class="account">
          <div id="medium" style="width: 100%;height:300px"></div>
        </el-card>
      </el-col>
      <!-- 容器使用情况 -->
      <el-col :span="6">
        <el-card header="容器数据信息" class="account">
          <div id="container" style="width: 100%;height:300px"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      model: {},
      noticeModel: {},
      noticeDetail: {},
      dialogVisible: false,
    };
  },
  methods: {
    async fetchAccount() {
      const res = await this.$http.get(`rest/accounts/${localStorage.id}`);
      this.model = res.data.pop(); // console.log(this.model);
    },
    async fetchNotice() {
      const res = await this.$http.get(`rest/notices`);
      this.noticeModel = res.data.reverse();
      console.log(this.noticeModel);
    },
    async showDetail(id) {
      const res = await this.$http.get(`rest/notices/${id}`);
      this.noticeDetail = res.data;
      this.dialogVisible = true;
    },
    async accountShow() {
      // 基于准备好的dom，初始化echarts实例-必须在实例渲染完后初始化
      var myChart = echarts.init(document.getElementById("account"), "light");
      const res = await this.$http.get("rest/datashow/accounts");
      myChart.setOption(res.data);
    },
    async meterShow() {
      // 基于准备好的dom，初始化echarts实例-必须在实例渲染完后初始化
      var myChart = echarts.init(document.getElementById("meter"), "light");
      const res = await this.$http.get("rest/datashow/meters");
      myChart.setOption(res.data);
    },
    async mediumShow() {
      // 基于准备好的dom，初始化echarts实例-必须在实例渲染完后初始化
      var myChart = echarts.init(document.getElementById("medium"), "light");
      const res = await this.$http.get("rest/datashow/mediums");
      myChart.setOption(res.data);
    },
    async containerShow() {
      // 基于准备好的dom，初始化echarts实例-必须在实例渲染完后初始化
      var myChart = echarts.init(document.getElementById("container"), "light");
      const res = await this.$http.get("rest/datashow/containers");
      myChart.setOption(res.data);
    },
  },
  created() {},
  mounted() {
    this.accountShow();
    this.meterShow();
    this.mediumShow();
    this.containerShow();
    this.fetchAccount();
    this.fetchNotice();
    window.WIDGET = { ID: "D5FBxzHHSI" };
    (function(d) {
      var cs = d.createElement("link");
      cs.rel = "stylesheet";
      cs.href =
        "https://apip.weatherdt.com/view/static/css/tqw_widget_view.css?v=0101";
      var s = d.createElement("script");
      s.src =
        "https://apip.weatherdt.com/view/static/js/tqw_widget_view.js?v=0101";
      var sn = d.getElementsByTagName("script")[0];
      sn.parentNode.insertBefore(cs, sn);
      sn.parentNode.insertBefore(s, sn);
    })(document);
  },
};
</script>

<style scoped>
.title {
  color: #606266;
  border-left: 6px solid #409eff;
  padding-left: 2rem;
  font-size: 1em;
}
.echarts-container {
  display: flex;
}

.report {
  flex: 1;
}

.user-info-avatar,
.user-info-detail,
.phone,
.email,
.changeAvatar,
.changePassword {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-info-detail {
  flex-direction: column;
}
.notice-container {
  height: 300px;
  overflow: scroll;
}
.notice-container::-webkit-scrollbar {
  display: none;
}
.text {
  font-size: 14px;
  text-align: center;
}

.item {
  margin-bottom: 18px;
  height: 40px;
}

.home .contact-information {
  display: flex;
  flex-direction: column;
  color: #606266;
}
.home .contact-information span {
  margin: 0.8rem 0;
}
.home .contact-information span i {
  margin: 0 0.6rem 0 0;
}

.home .right-info {
  /* background: pink; */
  height: 180px;
  display: flex;
  justify-content: space-around;
}
.home .right-info .box-card {
  padding: 0;
  margin: 0 1rem;
  height: 100%;
  flex: 1;
}
.home .right-info .box-card:nth-child(1) .el-card__header {
  background: #909399;
}
.home .right-info .box-card:nth-child(2) .el-card__header {
  background: #e6a23c;
}
.home .right-info .box-card:nth-child(3) .el-card__header {
  background: #67c23a;
}
el-avatar img {
  width: 100%;
}
</style>
