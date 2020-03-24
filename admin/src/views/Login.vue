// 登录页面
<template>
  <div class="container">
    <div class="login-container">
      <el-card header="请登录">
        <el-form @submit.native.prevent="login">
          <el-form-item label="用户名">
            <el-input v-model="model.account" placeholder></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="model.password" placeholder></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submint">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      //请求完成得到一个token
      const res = await this.$http.post("/login", this.model);
      localStorage.token = res.data.token;
      localStorage.authority = res.data.authority;
      localStorage.account = res.data.account;
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
      console.log(res.data);
    }
  }
};
</script>

<style scoped>
.container {
  background: url("../assets/login-bg.jpg");
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-container {
  width: 25rem;
  height: 25rem;
}
.el-card {
  background-color: rgba(243, 245, 243, 0.637);
}
</style>