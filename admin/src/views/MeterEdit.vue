<!--
 * @Author: 赵昱青
 * @Date: 2020-03-08 11:35:05
 * @LastEditTime: 2020-03-08 22:16:30
 * @LastEditors: 赵昱青
 * @Description: 仪表编辑页面
 -->

<template>
  <div>
    <h2 style="color:#606266;">{{ id ? "编辑" : "新建" }}仪器</h2>
    <el-divider></el-divider>

    <el-form label-width="120px" @submit.native.prevent="save">
      <el-row>
        <el-col :span="8">
          <el-form-item label="仪表名称">
            <el-input v-model="model.meterName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="仪表编号">
            <el-input v-model="model.meterNumber"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="位号">
            <el-input v-model="model.tagNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="容器形状尺寸">
            <el-input v-model="model.shape"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="容器材质">
            <el-input v-model="model.material"></el-input>
          </el-form-item>
        </el-col>
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
      </el-row>

      <!-- <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>-->
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
      model: {
        meterName: "",
        meterNumber: "",
        tagNumber: "",
        shape: "",
        material: "",
        thermalInsulation: false
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
        res = await this.$http.put(`rest/meters/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/meters`, this.model);
      }
      this.$router.push("/meters/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/meters/${this.id}`);
      this.model = res.data;
    }
    // res->服务端返回的数据
    // afterUpload(res) {
    //   // this.$set(this.model,'icon',res.url)
    //   this.model.icon = res.url;
    // }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style></style>
