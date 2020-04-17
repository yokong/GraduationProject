<template>
  <div>
    <el-breadcrumb class="title" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>审核报告单</el-breadcrumb-item>
      <el-breadcrumb-item>报告单详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider></el-divider>
    <el-row>
      <el-button @click="saveImg">保存为图片截图</el-button>
    </el-row>
    <el-backtop :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
      >
        UP
      </div>
    </el-backtop>
    <div class="wrap" ref="imageWrapper">
      <el-row class="container">
        <el-row class="report-header " :gutter="24">
          <!-- 安装人员 -->
          <el-col :span="6">
            <strong>安装人员</strong>
          </el-col>
          <el-col :span="6">{{ this.submitter_info.name }}</el-col>
          <!-- 填写时间 -->
          <el-col :span="6">
            <strong>填写时间</strong>
          </el-col>
          <el-col :span="6">123</el-col>
        </el-row>

        <el-divider content-position="left">客户信息</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 用户单位 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>用户单位</strong>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">{{ this.model.company }}</div>
          </el-col>
          <!-- 客户编码 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>客户编码</strong>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{ this.model.code }}</div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 详细地址 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>详细地址</strong>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ model.address }}</div>
          </el-col>
        </el-row>
        <!-- 联系人 -->
        <el-row
          type="flex"
          align="middle"
          v-for="(item, index) in model.contacts"
          :key="index"
          class="row"
          :gutter="24"
        >
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>联系人姓名</strong>
              :{{ (item.name, 333) }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>职务</strong>
              :{{ item.department }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <strong>手机</strong>
              :{{ item.phoneNumber }}
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <strong>email</strong>
              :{{ item.email }}
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <strong>qq</strong>
              :{{ item.qq }}
            </div>
          </el-col>
        </el-row>

        <el-divider content-position="left">现场工况</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 仪表型号 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>仪表型号</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ meter_info.meterName }}
            </div>
          </el-col>
          <!-- 仪表编号 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>仪表编号</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ meter_info.meterNumber }}
            </div>
          </el-col>
          <!-- 位号 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>位号</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ meter_info.tagNumber }}
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 容器形状 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>容器形状</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ container_info.shape }}
            </div>
          </el-col>
          <!-- 容器材质 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>容器材质</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ container_info.material }}
            </div>
          </el-col>
          <!-- 保温层 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>保温层</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ thermalInsulation }}</div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 其他液位计安装情况 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>其他液位计安装情况</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.otherCondition }}
            </div>
          </el-col>
          <!-- 二次仪表类型及数据存储 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>二次仪表类型及数据存储</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ model.meterType }}</div>
          </el-col>
          <!-- 容器投用时间 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>容器投用时间</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ model.useTime }}</div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 液体介质 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>液体介质</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ medium_info.mediumName }}
            </div>
          </el-col>
          <!-- 粘度 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>粘度</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ model.viscosity }}</div>
          </el-col>
          <!-- 密度 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">密度</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{ model.density }}</div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 温度范围 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">温度范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.temperatureRange }}
            </div>
          </el-col>
          <!-- 压力范围 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">压力范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.pressureRange }}
            </div>
          </el-col>
          <!-- 液位变化范围 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">液位变化范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.liquidLevelRange }}
            </div>
          </el-col>
        </el-row>

        <!-- 用户参数 -->
        <el-row align="middle" class="row" :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">用户参数</div>
          </el-col>
          <el-col :span="20" style="display:flex;flex-wrap:wrap">
            <div
              v-for="item in model.userPreferences"
              :key="item._id"
              style="width:10%"
            >
              <div class="grid-content bg-purple">
                {{ item.parameterNumber + "#" + item.parameterValue }}
              </div>
            </div>
          </el-col>
        </el-row>

        <el-divider content-position="left">技术信息</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 电源电压 -->
          <el-col :span="4">
            <div class="grid-content bg-purple" style="height:80px">
              电源电压
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              {{ model.maxVoltage.voltage }}
            </div>
            <div class="grid-content bg-purple">
              {{ model.minVoltage.voltage }}
            </div>
          </el-col>
          <!-- 校准信号 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">校准1信号</div>
            <div class="grid-content bg-purple">校准2信号</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              {{ model.maxVoltage.calibratingSignal }}
            </div>
            <div class="grid-content bg-purple">
              {{ model.minVoltage.calibratingSignal }}
            </div>
          </el-col>
        </el-row>
        <!-- 仪表电流 -->
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">仪表电流</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.electricity }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">实际自动复位液位值</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.liquidLevel }}
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">模拟输出回路电阻</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              {{ model.resistance }}
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <!-- 探头安装示意图 -->
          <el-col :span="4">
            <div style="height:144px" class="grid-content bg-purple">
              探头安装示意图
            </div>
          </el-col>
          <el-col style="height:144px" :span="20">
            <img :src="model.installationDiagram" style="height:100%" />
          </el-col>
          <!--内部参数  -->
        </el-row>
        <el-row align="middle" class="row" :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">内部参数</div>
          </el-col>
          <el-col :span="20" style="display:flex;flex-wrap:wrap">
            <div
              v-for="item in model.intrinsicPreferences"
              :key="item._id"
              style="width:10%"
            >
              <div class="grid-content bg-purple">
                {{ item.parameterNumber + "#" + item.parameterValue }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-divider content-position="left">现场数据记录</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col :span="3">
            <div class="grid-content bg-purple">时间</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">比对液位</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">仪表液位</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">仪表信号</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">信号波形文件名称</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">介质压力</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">介质温度</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">状态</div>
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col :span="3">
            <div class="grid-content bg-purple">{{ model.time }}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.contrastLiquidLevel }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.meterLiquidLevel }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.meterSignal }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.signalFileName }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.mediumPressure }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.mediumTempreature }}
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              {{ model.status.label }}
            </div>
          </el-col>
        </el-row>

        <el-divider content-position="left">仪表信号存储记录</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表信号存储图</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="model.signalFigure" alt />
          </el-col>
        </el-row>

        <el-divider content-position="left">现场照片</el-divider>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表全景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="model.meterPanorama" alt />
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表近景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="model.meterClose" alt />
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">管线全景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="model.pipelinePanorama" alt />
          </el-col>
        </el-row>
        <el-row type="flex" align="middle" class="row" :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">
              探头全景
            </div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="model.probePanorama" alt />
          </el-col>
        </el-row>
        <el-divider content-position="left">附加信息</el-divider>
        <el-row
          type="flex"
          style="margin-bottom:20px"
          align="middle"
          class="row"
          :gutter="24"
        >
          <!-- 详细地址 -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <strong>说明</strong>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{ model.otherContent }}</div>
          </el-col>
        </el-row>
        <el-row class="report-header" type="flex" align="middle" :gutter="24">
          <el-col :span="4">
            <div class="grid-content">
              <strong>部门主管</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <strong>{{ supervisor_info.name }}</strong>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content">
              <strong>审核时间</strong>
            </div>
          </el-col>
          <el-col :span="4">time</el-col>
          <el-col :span="4">
            <div class="grid-content"><strong>报告得分</strong></div>
          </el-col>
          <el-col style="h" :span="4">
            <div class="grid-content">
              <el-rate v-model="model.scoreReport"></el-rate>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <el-row type="flex" align="middle" style="margin-top:15px">
      <el-button type="danger" @click="reject">打回报告单</el-button>
      <!-- v-if="this.model.reportStatus != '已通过'" -->

      <el-button type="success" @click="pass">通过报告单</el-button>
    </el-row>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  props: {
    id: { type: String },
  },
  data() {
    return {
      imgUrl: "",
      model: {
        company: "",
        code: null,
        address: "",
        route: "",
        contacts: {
          name: "",

          department: "",
          phoneNumber: null,
          email: "",
          qq: null,
        },
        container: "",
        medium: "",
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
          calibratingSignal: "",
        },
        minVoltage: {
          voltage: "",
          calibratingSignal: "",
        },
        electricity: "",
        liquidLevel: "",
        resistance: "",
        intrinsicPreferences: [],
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
          label: "",
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
        submitter: "",
        // 报告单评分
        scoreReport: null,
      },
      meter_info: {},
      submitter_info: {},
      supervisor_info: {},
      container_info: {},
      medium_info: {},
      scoreReport: "",
    };
  },
  computed: {
    thermalInsulation() {
      if (this.container_info.thermalInsulation) {
        return "有";
      } else {
        return "无";
      }
    },
  },
  methods: {
    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/installationReports/${this.id}`);
      //  有个问题会把服务端的数据完整替换到客户端 相当于scores还是个undefined undefined.difficlut还会报错
      console.log(res);
      this.model = Object.assign({}, this.model, res.data[0]);
      console.log(222, this.model);
      this.meter_info = this.model.meter_info[0];
      this.submitter_info = this.model.submitter_info[0];
      this.supervisor_info = this.model.supervisor_info[0];
      this.medium_info = this.model.medium_info[0];
      this.container_info = this.model.container_info[0];
    },
    saveImg() {
      html2canvas(this.$refs.imageWrapper, {
        useCORS: true,
      }).then((canvas) => {
        this.imgURL = canvas.toDataURL();
        // console.log(999, this.imgURL);
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(this.imgURL.split(",")[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var blob = new Blob([u8arr]);
          window.navigator.msSaveOrOpenBlob(
            blob,
            "chart-download" + "." + "png"
          );
          this.$message({
            message: "下载成功",
            type: "success",
          });
        } else {
          // 这里就按照chrome等新版浏览器来处理
          const a = document.createElement("a");
          a.href = this.imgURL;
          a.setAttribute("download", "chart-download");
          a.click();
          this.$message({
            message: "下载成功",
            type: "success",
          });
        }
      });
    },
    async reject() {
      this.$prompt("请输入退回理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          this.$message({
            type: "success",
            message: "退回理由是: " + value,
          });
          this.model.returnReason = value;
          this.model.reportStatus = "未通过";
          await this.$http.put(
            `rest/installationReports/${this.id}`,
            this.model
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    // 通过报告单
    async pass() {
      this.$prompt("请输入评语", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(async ({ value }) => {
          this.$message({
            type: "success",
            message: "已通过报告单！ ",
          });
          this.model.returnReason = "/";
          this.model.comments = value;
          this.model.reportStatus = "已通过";
          await this.$http.put(
            `rest/installationReports/${this.id}`,
            this.model
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });

      // this.$confirm(`请确定是否通过此报告单`, "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "警告",
      // }).then(async () => {
      //   this.model.reportStatus = "已通过";
      //   await this.$http.put(`rest/installationReports/${this.id}`, this.model);
      // });
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.274);

  padding: 5px;
}
.report-header {
  font-size: 24px;
  margin: 20px 0;
  text-align: center;
}
.title {
  color: #606266;
  border-left: 6px solid #409eff;
  font-size: 1em;
  padding-left: 2rem;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  // line-height: 100%;
  // text-align: center;
  display: flex;
  align-items: center;
  // background: #88b7ee81;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.116);
  padding: 0.5em;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
