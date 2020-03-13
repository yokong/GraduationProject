<!--
 * @Author: 赵昱青
 * @Date: 2020-02-12 16:07:48
 * @LastEditTime: 2020-03-09 21:02:30
 * @LastEditors: 赵昱青
 * @Description: 主界面
 -->
<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px">
      <el-menu router style="height:100%" unique-opened>
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

          <!-- 分类开始 -->
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <!-- 分类结束 -->

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
        <el-row type="flex">
          <el-col :span="20"></el-col>
          <el-col class="person" :span="4">
            <el-dropdown>
              <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
              <el-avatar :size="40" :src="circleUrl" style="margin:0.5rem 0 0 1rem"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item disabled style="color:#333">鱼见</el-dropdown-item>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <router-view></router-view>
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
  background-color: #a1e6e3;
  color: #333;
  /* display: flex;
  justify-content: flex-end;
  align-items: center; */
}
.person {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.el-aside {
  color: #333;
  /* background: #f8b195; */
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 "
    };
    return {
      circleUrl:
        "https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3437873027,2858754537&fm=111&gp=0.jpg",
      tableData: Array(20).fill(item)
    };
  }
};
</script>
