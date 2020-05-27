<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>容器</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? "编辑" : "新建" }}容器</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row>
        <el-col :span="8">
          <el-form-item label="容器材质编号">
            <el-input v-model="model.materialNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="容器材料">
            <el-input v-model="model.material"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="壁厚(mm)">
            <el-input v-model="model.thickness"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="容器直径(mm)">
            <el-input v-model="model.diameter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="容器高度(mm)">
            <el-input v-model="model.height"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="保温层">
            <el-switch
              style="display: block;margin-top:0.5rem"
              v-model="model.thermalInsulation"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="有"
              inactive-text="无"
            ></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否锈蚀">
            <el-switch
              style="display: block;margin-top:0.5rem"
              v-model="model.isRust"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
            ></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注">
            <el-input v-model="model.note" type="textarea"></el-input>
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
        materialNumber: "",
        material: "",
        thickness: "",
        diameter: "",
        height: "",
        note: "",
      },
    };
  },
  // containers
  methods: {
    // 保存方法
    async save() {
      // this.$http.post()
      let res;
      if (this.id) {
        // 修改
        res = await this.$http.put(`rest/containers/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/containers`, this.model);
      }
      this.$router.push("/containers/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/containers/${this.id}`);
      this.model = res.data.pop();
    },
    // res->服务端返回的数据
    // afterUpload(res) {
    //   // this.$set(this.model,'icon',res.url)
    //   this.model.icon = res.url;
    // }
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
