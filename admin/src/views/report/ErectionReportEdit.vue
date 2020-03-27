<!--
 * @Author: 赵昱青
 * @Date: 2020-02-24 13:22:59
 * @LastEditTime: 2020-03-09 22:24:25
 * @LastEditors: 赵昱青
 * @Description: 安装报告单组件
 -->
<template>
  <div>
    <h2 style="color:#606266;">{{ id ? "编辑" : "新建" }}安装报告</h2>
    <el-divider></el-divider>

    <!-- 表单开始 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- 分页卡片开始 -->
      <el-tabs type="border-card" value="Info">
        <!-- 分页1:客户信息开始 -->
        <el-tab-pane label="客户信息" name="Info">
          <el-row type="flex">
            <!-- 用户单位开始 -->
            <el-col :span="6">
              <el-form-item label="用户单位">
                <el-input v-model="model.company"></el-input>
              </el-form-item>
            </el-col>
            <!-- 用户单位结束 -->

            <!-- 客户编码开始 -->
            <el-col :span="6">
              <el-form-item :span="6" label="客户编码">
                <el-input v-model="model.code"></el-input>
              </el-form-item>
            </el-col>
            <!-- 客户编码结束 -->
          </el-row>

          <el-row type="flex">
            <!-- 详细地址开始 -->
            <el-col :span="8">
              <el-form-item label="详细地址">
                <el-input v-model="model.address"></el-input>
              </el-form-item>
            </el-col>
            <!-- 详细地址结束 -->

            <!-- 行车路线开始 -->
            <el-col :span="8">
              <el-form-item label="行车路线">
                <el-input v-model="model.route"></el-input>
              </el-form-item>
            </el-col>
            <!-- 行车路线结束 -->
          </el-row>
          <!-- 联系人1开始 -->
          <el-divider content-position="left">联系人1</el-divider>
          <el-row type="flex">
            <!-- 联系人姓名开始 -->
            <el-col :span="6">
              <el-form-item label="联系人姓名">
                <el-input v-model="model.contacts1.name"></el-input>
              </el-form-item>
            </el-col>
            <!-- 联系人姓名结束 -->
            <!-- 部门职务开始 -->
            <el-col :span="6">
              <el-form-item label="部门职务">
                <el-input v-model="model.contacts1.department"></el-input>
              </el-form-item>
            </el-col>
            <!-- 部门职务姓名结束 -->
          </el-row>

          <el-row type="flex">
            <!-- 联系人手机号开始 -->
            <el-col :span="6">
              <el-form-item label="手机号">
                <el-input v-model="model.contacts1.phoneNumber"></el-input>
              </el-form-item>
            </el-col>
            <!-- 联系人手机号结束 -->
            <!-- 邮箱开始 -->
            <el-col :span="6">
              <el-form-item label="邮箱">
                <el-input v-model="model.contacts1.email"></el-input>
              </el-form-item>
            </el-col>
            <!-- 邮箱结束 -->
            <!-- qq开始 -->
            <el-col :span="6">
              <el-form-item label="QQ">
                <el-input v-model="model.contacts1.qq"></el-input>
              </el-form-item>
            </el-col>
            <!-- qq结束 -->
          </el-row>
          <!-- 联系人1结束 -->

          <!-- 联系人2开始 -->
          <el-divider content-position="left">联系人2</el-divider>
          <el-row type="flex">
            <!-- 联系人姓名开始 -->
            <el-col :span="6">
              <el-form-item label="联系人姓名">
                <el-input v-model="model.contacts2.name"></el-input>
              </el-form-item>
            </el-col>
            <!-- 联系人姓名结束 -->
            <!-- 部门职务开始 -->
            <el-col :span="6">
              <el-form-item label="部门职务">
                <el-input v-model="model.contacts2.department"></el-input>
              </el-form-item>
            </el-col>
            <!-- 部门职务姓名结束 -->
          </el-row>
          <el-row type="flex">
            <!-- 联系人手机号开始 -->
            <el-col :span="6">
              <el-form-item label="手机号">
                <el-input v-model="model.contacts2.phoneNumber"></el-input>
              </el-form-item>
            </el-col>
            <!-- 联系人手机号结束 -->
            <!-- 邮箱开始 -->
            <el-col :span="6">
              <el-form-item label="邮箱">
                <el-input type="email" v-model="model.contacts2.email"></el-input>
              </el-form-item>
            </el-col>
            <!-- 邮箱结束 -->
            <!-- qq开始 -->
            <el-col :span="6">
              <el-form-item label="QQ">
                <el-input v-model="model.contacts2.qq"></el-input>
              </el-form-item>
            </el-col>
            <!-- qq结束 -->
          </el-row>
          <!-- 联系人2结束 -->
        </el-tab-pane>
        <!-- 分页1:客户信息结束 -->

        <!-- 分页2:现场工况开始 -->
        <el-tab-pane label="现场工况" name="working">
          <!-- 仪表开始 -->
          <el-row>
            <el-form-item label="仪表">
              <el-select v-model="model.meter">
                <el-option
                  v-for="item of meters"
                  :label="item.meterName"
                  :value="item._id"
                  :key="item._id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <!-- 仪表结束 -->
          <!-- 其他信息开始 -->
          <el-row type="flex">
            <el-col :span="6">
              <el-form-item label="其他液位计安装情况">
                <el-input v-model="model.otherCondition"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="二次仪表类型及数据存储">
                <el-input v-model="model.meterType"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="容器投用时间">
                <el-input v-model="model.useTime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-col :span="6">
              <el-form-item label="液体介质">
                <el-input v-model="model.liquidMedium"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="粘度">
                <el-input v-model="model.viscosity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="密度">
                <el-input v-model="model.density"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row type="flex">
            <el-col :span="6">
              <el-form-item label="温度范围">
                <el-input v-model="model.temperatureRange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="压力范围">
                <el-input v-model="model.pressureRange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="液位变化范围">
                <el-input v-model="model.liquidLevelRange"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item label="用户参数">
              <el-input
                type="textarea"
                placeholder="多个数据请用英文逗号(,)隔开"
                :rows="2"
                :cols="4"
                v-model="model.userPreferences"
              ></el-input>
            </el-form-item>
          </el-row>
          <!-- 其他信息结束 -->
        </el-tab-pane>
        <!-- 分页2::现场工况结束 -->

        <!-- 分页3::技术信息开始 -->
        <el-tab-pane label="技术信息" name="technicalInformation">
          <el-divider content-position="left">电源电压</el-divider>
          <el-row>
            <el-col :span="6">
              <el-form-item label="最大电压">
                <el-input v-model="model.maxVoltage.voltage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="校准1信号">
                <el-input v-model="model.maxVoltage.calibratingSignal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="最小电压">
                <el-input v-model="model.minVoltage.voltage"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="校准2信号">
                <el-input v-model="model.minVoltage.calibratingSignal"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="left">其他</el-divider>
          <el-row>
            <el-col :span="6">
              <el-form-item label="仪表电流">
                <el-input v-model="model.electricity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="实际自动复位液位值">
                <el-input v-model="model.liquidLevel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="模拟输出回路电阻">
                <el-input v-model="model.resistance"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="内部参数">
              <el-input
                type="textarea"
                placeholder="多个数据请用英文逗号(,)隔开"
                :rows="2"
                :cols="4"
                v-model="model.intrinsicParameter"
              ></el-input>
            </el-form-item>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-form-item label="安装示意图">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload1"
              >
                <img
                  v-if="model.installationDiagram"
                  :src="model.installationDiagram"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-tab-pane>
        <!-- 分页3:技术信息结束 -->

        <!-- 分页4:现场数据记录开始 -->
        <el-tab-pane label="现场数据记录" name="fieldData">
          <!-- 日期开始 -->
          <el-row>
            <el-form-item label="时间">
              <el-date-picker
                v-model="model.time"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-row>
          <!-- 日期结束 -->

          <!-- 其他信息开始 -->
          <el-row>
            <el-col :span="6">
              <el-form-item label="对比液位">
                <el-input v-model="model.contrastLiquidLevel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="仪表液位">
                <el-input v-model="model.meterLiquidLevel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="仪表信号">
                <el-input v-model="model.meterSignal"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="信号波形文件名">
                <el-input v-model="model.signalFileName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="介质压力">
                <el-input v-model="model.mediuPressure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="介质温度">
                <el-input v-model="model.mediumTemperature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-select @change="select" v-model="model.status">
                  <el-option
                    v-for="item of status"
                    :label="item.label"
                    :value="item"
                    :key="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 其他信息结束 -->
        </el-tab-pane>
        <!-- 分页4:现场数据记录结束 -->

        <!-- 分页5：仪表信号存储记录开始 -->
        <el-tab-pane label="仪表信号存储记录" name="meterSignalStorageRecord">
          <el-row>
            <el-form-item label="信号记录图">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="afterUpload2"
              >
                <img v-if="model.signalFigure" :src="model.signalFigure" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-row>
        </el-tab-pane>
        <!-- 仪表信号存储记录结束 -->

        <!-- 分页6：现场照片开始 -->
        <el-tab-pane label="现场照片" name="sitePhotos">
          <el-divider content-position="left">仪表全景</el-divider>
          <el-form-item label="仪表全景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload3"
            >
              <img v-if="model.meterPanorama" :src="model.meterPanorama" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="仪表近景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload4"
            >
              <img v-if="model.meterClose" :src="model.meterClose" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="管线全景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload5"
            >
              <img v-if="model.pipelinePanorama" :src="model.pipelinePanorama" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="探头全景">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload6"
            >
              <img v-if="model.probePanorama" :src="model.probePanorama" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <!-- 分页6：现场照片结束 -->

        <!-- 分页7:附加信息开始 -->
        <el-tab-pane label="附加信息" name="overheadInformation">
          <el-row type="flex">
            <el-col>
              <el-form-item label="技术主管">
                <el-select v-model="model.supervisor">
                  <el-option
                    v-for="item of supervisors.filter(item=>item.authority=='2')"
                    :label="item.name"
                    :value="item._id"
                    :key="item._id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="特殊情况说明">
                <el-input type="textarea" v-model="model.otherContent"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 分页7：附加信息结束 -->
      </el-tabs>
      <!-- 分页卡片结束 -->

      <!-- 提交按钮开始 -->
      <el-form-item style="margin-top:1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
    <!-- 提交按钮结束 -->
    <!-- 表单结束 -->
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      // 状态 进料、出料、静止
      status: [
        { value: 1, label: "进料" },
        { value: 2, label: "出料" },
        { value: 3, label: "静止" }
      ],
      // 仪表数据
      meters: [],
      // 装备数据
      supervisors: [],

      model: {
        company: "",
        code: null,
        address: "",
        route: "",
        contacts1: {
          name: "",
          department: "",
          phoneNumber: null,
          email: "",
          qq: null
        },
        contacts2: {
          name: "",
          department: "",
          phoneNumber: null,
          email: "",
          qq: null
        },
        // 现场工况
        meter: null,
        otherCondition: "",
        meterType: "",
        useTime: "",
        liquidMedium: "",
        viscosity: "",
        desity: "",
        temperatureRange: "",
        pressureRange: "",
        liquidLevelRange: "",
        userPreferences: "",
        // 技术信息
        maxVoltage: {
          voltage: "",
          calibratingSignal: ""
        },
        minVoltage: {
          voltage: "",
          calibratingSignal: ""
        },
        electricity: "",
        liquidLevel: "",
        resistance: "",
        intrinsicParameter: "",
        installationDiagram: "",
        // 现场数据记录
        time: "",
        contrastLiquidLevel: "",
        meterliquidLevel: "",
        meterSignal: "",
        signalFileName: "",
        mediumPressure: "",
        mediumTemperature: "",
        status: {
          value: null,
          label: ""
        },
        signalFigure: "",
        // 现场照片
        meterPanorama: "",
        meterClose: "",
        pipelinePanorama: "",
        probePanorama: "",
        // 附加信息
        supervisor: null,
        otherContent: "",
        // 特殊信息
        reportStatus: "",
        // 提交者
        submitter: ""
      }
    };
  },
  methods: {
    // 保存方法
    async save() {
      // this.$http.post()
      let res;
      if (this.id) {
        this.model.submitter = localStorage.id;
        this.model.reportStatus = "未提交";
        console.log(this.model);
        // 修改
        res = await this.$http.put(
          `rest/erectionReports/${this.id}`,
          this.model
        );
      } else {
        // 新建
        this.model.submitter = localStorage.id;
        this.model.reportStatus = "未提交";
        res = await this.$http.post(`rest/erectionReports/`, this.model);
      }
      this.$router.push("/erectionReports/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/erectionReports/${this.id}`);

      //  有个问题会把服务端的数据完整替换到客户端 相当于scores还是个undefined undefined.difficlut还会报错
      this.model = Object.assign({}, this.model, res.data.pop());
      // console.log(this.model.meter.meterName);
      console.log(localStorage.id);
    },

    // 安装示意图
    afterUpload1(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.installationDiagram = res.url;
    },
    // 仪表信号存储记录图
    afterUpload2(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.signalFigure = res.url;
    },
    // 仪表全景
    afterUpload3(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.meterPanorama = res.url;
    },
    // 仪表近景
    afterUpload4(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.meterClose = res.url;
    },
    // 管线全景
    afterUpload5(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.pipelinePanorama = res.url;
    },
    // 探头全景
    afterUpload6(res) {
      // this.$set(this.model,'avatar',res.url)
      this.model.probePanorama = res.url;
    },
    // 查询仪表
    async fetchMeters() {
      const res = await this.$http.get(`rest/meters`);
      this.meters = res.data;
      // console.log(this.meters);
    },

    // 查询主管
    async fetchSupervisor() {
      const res = await this.$http.get(`rest/accounts`);
      this.supervisors = res.data;
      // console.log(this.supervisors);
    },
    select(item) {
      this.model.status.label = item.label;
      this.model.status.value = item.value;
      // console.log(item);
    }
  },
  created() {
    this.fetchMeters();
    this.fetchSupervisor();
    this.id && this.fetch();
    // console.log(this.supervisors);
    // console.log(this.model.supervisor);
    // console.log(this.supervisors);
    console.log(localStorage.id);
  }
};
</script>

<style>
</style>
