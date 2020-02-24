<template>
  <div>
    <h2>{{ id ? "编辑" : "新建" }}英雄</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 名称开始 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- 名称结束 -->

      <!-- 头像开始 -->
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
      <!-- 头像结束 -->

      <!-- 称号开始 -->
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- 称号结束 -->

      <!-- 类型开始 -->
      <el-form-item label="称号">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :label="item.name"
            :value="item._id"
            :key="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 类型结束 -->

      <!-- 评分开始 -->
      <el-form-item label="难度">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
      </el-form-item>

      <el-form-item label="技能">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>

      <el-form-item label="攻击">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>

      <el-form-item label="生存">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>
      <!-- 评分结束 -->

      <!-- 顺风出装开始 -->
      <el-form-item label="顺出装">
        <el-select v-model="model.items1" multiple>
          <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 顺风出装结束 -->

      <!-- 逆风出装开始 -->
      <el-form-item label="顺出装">
        <el-select v-model="model.items2" multiple>
          <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
        </el-select>
      </el-form-item>
      <!-- 逆风出装结束 -->

      <!-- 使用技巧开始 -->
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <!-- 使用技巧结束 -->

      <!-- 对战技巧开始 -->
      <el-form-item label="对战技巧">
        <el-input type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <!-- 对战技巧结束 -->

      <!-- 团战思路开始 -->
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="model.teamTips"></el-input>
      </el-form-item>
      <!-- 团战思路结束 -->

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
      // 装备数据
      items: [],
      // 分类数据
      categories: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        }
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
        res = await this.$http.put(`rest/heros/${this.id}`, this.model);
      } else {
        // 新建
        res = await this.$http.post(`rest/heros`, this.model);
      }
      this.$router.push("/heros/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`);

      //  有个问题会把服务端的数据完整替换到客户端 相当于scores还是个undefined undefined.difficlut还会报错
      // this.model = res.data;

      this.model = Object.assign({}, this.model, res.data);
    },

    // res->服务端返回的数据
    afterUpload(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.avatar = res.url;
    },

    // 查询分类
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 查询装备
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
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
