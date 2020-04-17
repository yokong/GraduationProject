<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="姓名"
        label="姓名"
        placeholder="姓名"
      />
      <van-field
        v-model="form.company"
        name="公司名"
        label="公司名"
        placeholder="公司名"
      />
      <van-field
        v-model="form.telephone"
        name="联系方式"
        label="联系方式"
        placeholder="联系方式"
      />

      <van-field
        readonly
        clickable
        name="calendar"
        :value="value"
        label="上门日期"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm" />

      <van-field
        v-model="form.comment"
        rows="4"
        autosize
        label="留言"
        type="textarea"
        placeholder="请输入留言"
      />

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      value: "",
      showCalendar: false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },
  methods: {
    onSubmit() {
      Dialog.confirm({
        title: "提示",
        message: "是否提交预约申请",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
    onConfirm(date) {
      this.value = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
  },
};
</script>

<style>
html {
  height: 100vh;
}
body {
  background-color: #f7f8fa;
}
</style>
