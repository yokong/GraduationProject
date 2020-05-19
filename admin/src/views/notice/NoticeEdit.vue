<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公告</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? "编辑" : "新建" }}公告</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公告标题">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="model.date"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="公告内容">
            <el-input v-model="model.content" type="textarea"></el-input>
          </el-form-item>
        </el-col>
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
    id: { type: String },
  },
  data() {
    return {
      model: {
        title: "",
        content: "",
        date: "",
      },
    };
  },
  methods: {
    // 保存方法
    async save() {
      // this.$http.post()
      let res;
      if (this.id) {
        // 修改
        res = await this.$http.put(`rest/notices/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/notices`, this.model);
      }
      this.$router.push("/notices/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/notices/${this.id}`);
      console.log(this.id);
      console.log(res);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
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
</style>
