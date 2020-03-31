<template>
  <div>
    <!-- <h2 class="title">{{ id ? "编辑" : "新建" }}账号</h2> -->
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? "编辑" : "新建" }}账号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="权限">
            <el-select v-model="model.authority" placeholder="请选择">
              <el-option
                v-for="item in authorities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="账号">
            <el-input v-model="model.account"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码">
            <el-input v-model="model.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="8">
          <el-form-item label="电话">
            <el-input v-model="model.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱">
            <el-input v-model="model.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="model.avatar" :src="model.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      authorities: [
        {
          value: 1,
          label: "安装工程师"
        },
        {
          value: 2,
          label: "技术主管"
        },
        {
          value: 3,
          label: "管理员"
        }
      ],
      model: {
        authority: null,
        account: "",
        password: "",
        name: "",
        phoneNumber: null,
        email: "",
        avatar: ""
      }
    };
  },
  methods: {
    // 保存方法
    async save() {
      // this.$http.post()
      let res;
      if (this.id) {
        // 修改
        res = await this.$http.put(`rest/accounts/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/accounts`, this.model);
      }
      this.$router.push("/accounts/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取所编辑信息的方法
    async fetch() {
      const res = await this.$http.get(`/rest/accounts/${this.id}`);
      console.log(res.data);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data.pop());
    },
    afterUpload(res) {
      // this.$set(this.model,'icon',res.url)
      this.model.avatar = res.url;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style scoped>
.title {
  color: #606266;
  border-left: 6px solid #409eff;
  padding-left: 2rem;
  font-size: 1em;
}
</style>
