<!--
 * @Author: 赵昱青
 * @Date: 2020-02-12 16:07:48
 * @LastEditTime: 2020-03-09 21:02:30
 * @LastEditors: 赵昱青
 * @Description: 主界面
 -->
<template>
  <div>
    <el-backtop :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >↑</div>
    </el-backtop>
    <el-container style="height: 100vh;">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#31353d"
        text-color="#b8bfce"
        active-text-color="#409eff"
        router
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <!-- 主页开始 -->
        <el-menu-item style="height:60px" index="/home">
          <i class="el-icon-house"></i>
          <span>主页</span>
        </el-menu-item>
        <!-- 主页结束 -->

        <!-- 参数管理开始 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-odometer"></i>
            <span>相关参数</span>
          </template>

          <!-- 仪器开始 -->
          <el-menu-item-group>
            <!-- <template slot="title">
                  <strong>仪表</strong>
            </template>-->
            <el-menu-item index="/meters/create">新建仪表</el-menu-item>
            <el-menu-item index="/meters/list">仪表列表</el-menu-item>
          </el-menu-item-group>
          <!-- 仪器结束 -->
        </el-submenu>
        <!-- 参数管理结束 -->

        <!-- 报告管理开始 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-tickets"></i>
            <span>安装报告单</span>
          </template>
          <!-- 安装报告开始 -->
          <el-menu-item-group>
            <el-menu-item index="/erectionReports/create">新建安装报告</el-menu-item>
            <el-menu-item index="/erectionReports/list">安装报告列表</el-menu-item>
          </el-menu-item-group>
          <!-- 安装报告结束 -->
        </el-submenu>
        <!-- 报告单管理结束 -->

        <!-- 账户管理开始 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>账号管理</span>
          </template>

          <el-menu-item-group>
            <!-- <template slot="title">
                  <strong>账号</strong>
            </template>-->
            <el-menu-item index="/accounts/create">新建账号</el-menu-item>
            <el-menu-item index="/accounts/list">账号列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 账户管理结束 -->

        <!-- 审核开始 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>审核安装报告</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/audits/list">待审核报告列表</el-menu-item>
            <el-menu-item index="/audits/pass">已通过审核报告列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 审核结束 -->
      </el-menu>
      <el-container>
        <el-header>
          <el-row type="flex" align="middle" :gutter="24">
            <el-col :span="1">
              <i
                @click="show"
                style="font-size:20px;"
                :class="[isCollapse?'el-icon-arrow-right':'el-icon-arrow-left']"
              ></i>
            </el-col>
            <el-col class="project-title" :span="19">
              <h3>基于B/S的危化品仪表行业客服管理系统</h3>
            </el-col>
            <el-col class="profile-avatar" :span="4">
              <el-dropdown class="dropdown" @command="handleCommand">
                <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
                <el-avatar shape="square" :fit="fit" :size="40" :src="model.avatar"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item disabled>
                    {{
                    model.name
                    }}
                  </el-dropdown-item>
                  <el-dropdown-item command="person">个人信息</el-dropdown-item>
                  <el-dropdown-item command="exit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="margin:20px;">
          <transition name="fade" mode="out-in">
            <router-view :key="$route.path"></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: false,
      fit: "contain",
      model: {},
      circleUrl:
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3437873027,2858754537&fm=111&gp=0.jpg"
      // tableData: Array(20).fill(item)
    };
  },
  methods: {
    async fetchAccount() {
      const res = await this.$http.get("rest/accounts");
      this.model = res.data
        .filter((item, index) => {
          return item.account == localStorage.getItem("account");
        })
        .pop();
      // console.log(this.model);
    },
    handleCommand(command) {
      if (command == "person") {
        if (this.$route.path != "/home") {
          this.$router.push({ path: "/home" });
        }
      } else if (command == "exit") {
        this.$router.push("/login");

        localStorage.clear();
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    show() {
      this.isCollapse = !this.isCollapse;
    }
  },
  created() {
    this.fetchAccount();
  }
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
}
.warp {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

.el-header {
  font: Tahoma, Helvetica, Arial, "\5b8b\4f53", sans-serif;
  background-color: #dddddd;
  border-bottom: 1px solid #dcdfe6;
  color: black;
}

.profile-avatar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.sider-bar {
  height: 100%;
}

.fade-enter {
  opacity: 0;
}
.fade-leave {
  opacity: 1;
}
.fade-enter-active {
  transition: opacity 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
