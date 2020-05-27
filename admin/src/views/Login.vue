<template>
  <div class="login-container">
    <h1 class="admin-title">危化品仪表行业客服管理系统</h1>
    <div class="login">
      <span class="title">登录</span>
      <div>
        <input
          class="account"
          v-model="model.account"
          type="text"
          placeholder="账号"
        />
        <input
          class="password"
          v-model="model.password"
          type="password"
          placeholder="密码"
        />
      </div>
      <el-button @click="login" type="primary" class="login-btn">
        登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      //请求完成得到一个token
      const res = await this.$http.post("/login", this.model);
      localStorage.token = res.data.token;
      localStorage.authority = res.data.user.authority;
      localStorage.account = res.data.user.account;
      localStorage.id = res.data.user._id;

      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  color: #292e27;
  background-color: rgba(53, 52, 52, 0.274);
  position: absolute;
  top: 0;
  margin: 0;
  margin: 0 0 1em 0;
  border-bottom: 1px dashed;
  font-weight: bold;
}

.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/bg-login.jpg") center center;
}
.login {
  width: 250px;
  background-color: rgba(53, 52, 52, 0.89);
  border-radius: 15px;
  padding: 20px;
}
.title {
  /* padding-left: 30px; */
  margin-bottom: 40px;
  font-size: 24px;
  color: white;
  font-weight: bold;
}
.account,
.password {
  outline: none;
  border: none;
  list-style: none;
  background-color: transparent;
  border-bottom: 2px solid rgba(114, 112, 112, 0.842);
  width: 100%;
  height: 3em;
  color: white;
  margin-top: 2em;
}
.account::-webkit-input-placeholder,
.password ::-webkit-input-placeholder {
  font-size: 16px;
  color: #727f6d;
}
.login-btn {
  width: 100%;
  margin-top: 2em;
}
</style>
