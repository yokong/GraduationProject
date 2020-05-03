<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row :gutter="20" style="padding-bottom:30px">
      <el-col :span="10">
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
                <el-button type="text" @click="passwordDialogVisible = true">
                  修改信息
                </el-button>
              </el-col>
              <el-col class="changePassword" :span="12">
                <el-button type="text" @click="exit">退出登录</el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

      <!-- 密码修改区域 -->
      <el-dialog
        title="修改密码"
        :visible.sync="passwordDialogVisible"
        width="50%"
      >
        <el-form label-width="50">
          <el-row type="flex" justify="space-around">
            <el-col :span="8">
              <el-form-item label="新密码">
                <el-input
                  v-model="model.password"
                  :placeholder="model.password"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="新电话">
                <el-input
                  v-model="accountInfo.phoneNumber"
                  :placeholder="model.phoneNumber"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex" justify="space-around">
            <el-col :span="8"
              ><el-form-item label="新邮箱">
                <el-input
                  v-model="accountInfo.email"
                  :placeholder="model.email"
                ></el-input> </el-form-item
            ></el-col>
            <el-col :span="8">
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="afterUpload"
                >
                  <img
                    v-if="model.avatar"
                    width="70"
                    :src="model.avatar"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> </el-form-item
            ></el-col>
          </el-row>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="passwordDialogVisible = false">
            取 消
          </el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 通知区域 -->
      <el-col :span="14">
        <el-card header="通知" class="report">
          <div class="notice-container">
            <el-row v-show="!noticeModel.length" type="flex" justify="center">
              <el-col :span="4">暂无公告</el-col>
            </el-row>
            <el-row
              v-show="noticeModel.length"
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
    </el-row>
    <!-- 通知对话框区域 -->
    <el-dialog
      :title="noticeDetail.title"
      :visible.sync="noticeDialogVisible"
      width="30%"
    >
      <div style="margin-bottom:40px">{{ noticeDetail.content }}</div>
      <div style="text-align:right">
        {{ "于 " + noticeDetail.date + " 发布" }}
      </div>
    </el-dialog>
    <!-- 图标展示区域 -->
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
      accountInfo: {},
      noticeModel: {},
      noticeDetail: {},
      noticeDialogVisible: false,
      avatarDialogVisible: false,
      passwordDialogVisible: false,
    };
  },
  methods: {
    // 当前账户数据信息请求
    async fetchAccount() {
      const res = await this.$http.get(`rest/accounts/${localStorage.id}`);
      console.log("数据", res.data);
      // this.model = res.data.pop(); // console.log(this.model);
      this.model = res.data;
    },
    // 通知列表数据请求
    async fetchNotice() {
      const res = await this.$http.get(`rest/notices`);
      this.noticeModel = res.data.reverse();
      console.log(this.noticeModel);
    },
    // 通知细节请求
    async showDetail(id) {
      const res = await this.$http.get(`rest/notices/${id}`);
      this.noticeDetail = res.data;
      this.noticeDialogVisible = true;
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

    // 修改密码方法
    async changePassword() {
      if (this.accountInfo.email) {
        this.model.email = this.accountInfo.email;
      }
      if (this.accountInfo.phoneNumber) {
        this.model.phoneNumber = this.accountInfo.phoneNumber;
      }
      const res = await this.$http.put(
        `rest/accounts/${this.model._id}`,
        this.model
      );
      this.$message.success("更改成功");
      this.passwordDialogVisible = false;
      console.log(res);
    },
    // 上传
    afterUpload(res) {
      this.model.avatar = res.url;
    },

    // 退出功能
    exit() {
      this.$router.push("/login");
      localStorage.clear();
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
