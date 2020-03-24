<!--
 * @Author: 赵昱青
 * @Date: 2020-02-12 16:07:48
 * @LastEditTime: 2020-03-09 21:02:30
 * @LastEditors: 赵昱青
 * @Description: 主界面
 -->
<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside style="background-color:#F3" width="200px">
      <el-menu style="height:100%;background-color:#F3F3F3" router unique-opened>
        <!-- 主页开始 -->
        <el-menu-item index="/home">
          <i class="el-icon-house"></i>
          主页
        </el-menu-item>
        <!-- 主页结束 -->
        <!-- 参数管理开始 -->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-odometer"></i>相关参数信息
          </template>

          <!-- 仪器开始 -->
          <el-menu-item-group>
            <template slot="title">仪表</template>
            <el-menu-item index="/meters/create">新建仪表</el-menu-item>
            <el-menu-item index="/meters/list">仪表列表</el-menu-item>
          </el-menu-item-group>
          <!-- 仪器结束 -->
        </el-submenu>
        <!-- 参数管理结束 -->

        <!-- 报告管理开始 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-message"></i>安装报告单
          </template>

          <!-- 安装报告开始 -->
          <el-menu-item-group>
            <template slot="title">安装报告</template>
            <el-menu-item index="/erectionReports/create">新建安装报告</el-menu-item>
            <el-menu-item index="/erectionReports/list">安装报告列表</el-menu-item>
          </el-menu-item-group>
          <!-- 安装报告结束 -->
        </el-submenu>
        <!-- 报告单管理结束 -->

        <!-- 账户管理开始 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-user"></i>账户管理
          </template>

          <el-menu-item-group>
            <template slot="title">账号</template>
            <el-menu-item index="/accounts/create">新建账号</el-menu-item>
            <el-menu-item index="/accounts/list">账号列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- 账户管理结束 -->
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row type="flex" align="middle" class="header-bar">
          <el-col :span="20">
            <h3>基于B/S的危化品仪表行业客服管理系统</h3>
          </el-col>
          <el-col class="profile" :span="4">
            <el-dropdown @command="handleCommand">
              <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
              <el-avatar :size="40" :src="model.avatar"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled style="color:#333">{{model.name}}</el-dropdown-item>
                <el-dropdown-item command="person">个人信息</el-dropdown-item>
                <el-dropdown-item command="exit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <transition name="fade" mode="out-in">
          <router-view :key=" $route.path"></router-view>
        </transition>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140"></el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>-->
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #f3f3f3;
  color: #333;
  /* display: flex;
  justify-content: flex-end;
  align-items: center; */
}
.profile {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-aside {
  color: #333;
  /* background: #f8b195; */
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

<script>
export default {
  data() {
    // const item = {
    //   date: "2016-05-02",
    //   name: "王小虎",
    //   address: "上海市普陀区金沙江路 1518 "
    // };
    return {
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
      console.log(this.model);
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

    person() {},
    exit() {
      alert(123);
      // localStorage.clear();
    }
  },
  created() {
    this.fetchAccount();
  }
};
</script>
