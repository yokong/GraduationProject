<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}文章</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引用富文本编辑器
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: { type: String }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    // 保存方法
    async save() {
      // this.$http.post()
      let res;
      if (this.id) {
        // 修改
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/articles`, this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    // 获取所编辑文章信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },

    // 获取文章所属分类
    async fetchCategories() {
      const res = await this.$http.get(`rest/category`);
      this.categories = res.data;
    },

    // 自定义富文本图片处理
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // 定义一个表单数据
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
