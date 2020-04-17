<template>
  <div id="app">
    <van-tabbar route>
      <van-tabbar-item replace to="/appointment" icon="orders-o">
        维修
      </van-tabbar-item>
      <van-tabbar-item replace to="/person" icon="manager-o">
        个人
      </van-tabbar-item>
    </van-tabbar>
    <router-view />
  </div>
</template>

<style lang="less"></style>
