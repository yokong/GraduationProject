<template>
  <div>
    <h2 style="color:#606266;">待审核安装报告详情</h2>
    <el-button @click="saveImg">保存截图</el-button>
    <div class="wrap" ref="imageWrapper">
      <el-row class="container">
        <el-row :gutter="24">
          <el-col :span="6">客服人员</el-col>
          <el-col :span="6">{{this.submitter_info.name}}</el-col>
          <el-col :span="6">填写时间</el-col>
          <el-col :span="6">123</el-col>
        </el-row>
        <el-divider content-position="left">客户信息</el-divider>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">用户单位</div>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">{{this.model.company}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">客户编码</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">{{this.model.code}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">详细地址</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">{{this.model.addreess}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">联系人姓名:{{this.model.contacts1.name}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">职务:{{this.model.contacts1.department}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">手机:{{this.model.contacts1.phoneNumber}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">email:{{this.model.contacts1.email}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">qq:{{this.model.contacts1.qq}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">联系人姓名:{{this.model.contacts2.name}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">职务:{{this.model.contacts2.department}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">手机:{{this.model.contacts2.phoneNumber}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">email:{{this.model.contacts2.email}}</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">qq:{{this.model.contacts2.qq}}</div>
          </el-col>
        </el-row>

        <el-divider content-position="left">现场工况</el-divider>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">仪表型号</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.meter_info.meterName}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">仪表编号</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.meter_info.meterNumber}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">位号</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.meter_info.tagNumber}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">容器形状</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.meter_info.shape}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">容器材质</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.meter_info.material}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">保温层</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{thermalInsulation}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">其他液位计安装情况</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.otherCondition}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">二次仪表类型及数据存储</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.meterType}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">容器投用时间</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.useTime}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">液体介质</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.liquidMedium}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">粘度</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.viscosity}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">密度</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.density}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">温度范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.temperatureRange}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">压力范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.pressureRange}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">液位变化范围</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.liquidLevelRange}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">用户参数</div>
          </el-col>
          <el-col :span="20">
            <div class="grid-content bg-purple">乌拉</div>
          </el-col>
        </el-row>

        <el-divider content-position="left">技术信息</el-divider>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple" style="height:80px">电源电压</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{this.model.maxVoltage.voltage}}</div>
            <div class="grid-content bg-purple">{{this.model.minVoltage.voltage}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">校准1信号</div>
            <div class="grid-content bg-purple">校准2信号</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{this.model.maxVoltage.calibratingSignal}}</div>
            <div class="grid-content bg-purple">{{this.model.minVoltage.calibratingSignal}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div class="grid-content bg-purple">仪表电流</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.electricity}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">实际自动复位液位值</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.liquidLevel}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">模拟输出回路电阻</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">{{this.model.resistance}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div style="height:144px" class="grid-content bg-purple">探头安装示意图</div>
          </el-col>
          <el-col style="height:144px" :span="20">
            <img :src="this.model.installationDiagram" style="height:100%" />
          </el-col>
        </el-row>

        <el-divider content-position="left">现场数据记录</el-divider>
        <el-row :gutter="24">
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
        <el-row :gutter="24">
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.time}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.contrastLiquidLevel}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.meterLiquidLevel}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.meterSignal}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.signalFileName}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.mediumPressure}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.mediumTempreature}}</div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">{{this.model.status.label}}</div>
          </el-col>
        </el-row>

        <el-divider content-position="left">仪表信号存储记录</el-divider>
        <el-row :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表信号存储图</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="this.model.signalFigure" alt />
          </el-col>
        </el-row>

        <el-divider content-position="left">现场照片</el-divider>
        <el-row :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表全景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="this.model.meterPanorama" alt />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">仪表近景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="this.model.meterClose" alt />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col style="height:244px" :span="4">
            <div class="grid-content bg-purple">管线全景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="this.model.pipelinePanorama" alt />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">
            <div style="height:244px" class="grid-content bg-purple">探头全景</div>
          </el-col>
          <el-col style="height:244px" :span="20">
            <img style="height:100%" :src="this.model.probePanorama" alt />
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="4">部门主管</el-col>
          <el-col :span="4">{{this.supervisor_info.name}}</el-col>
          <el-col :span="4">审核时间</el-col>
          <el-col :span="4">time</el-col>
          <el-col :span="4">报告得分</el-col>
          <el-col style="h" :span="4">
            <div class="grid-content bg-purple">
              <el-input v-model="auditTime" min="0" max="100" placeholder type="number"></el-input>
            </div>
          </el-col>
        </el-row>
      </el-row>
    </div>
    <el-button @click="reject">打回报告单</el-button>
  </div>
</template>


<script>
import html2canvas from "html2canvas";
export default {
  props: {
    id: { type: String }
  },
  data() {
    return {
      imgUrl: "",
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
      },
      meter_info: {},
      submitter_info: {},
      supervisor_info: {},
      auditTime: ""
    };
  },
  computed: {
    thermalInsulation() {
      if (this.meter_info.thermalInsulation) {
        return "有";
      } else {
        return "无";
      }
    }
  },
  methods: {
    // 获取所编辑分类信息的方法
    async fetch() {
      const res = await this.$http.get(`rest/erectionReports/${this.id}`);
      //  有个问题会把服务端的数据完整替换到客户端 相当于scores还是个undefined undefined.difficlut还会报错
      this.model = Object.assign({}, this.model, res.data[0]);
      console.log(this.model);
      this.meter_info = this.model.meter_info[0];
      this.submitter_info = this.model.submitter_info[0];
      this.supervisor_info = this.model.supervisor_info[0];
      // console.log(this.meter_info);
      //   console.log(this.model);

      // console.log(this.model.meter.meterName);
      //   console.log(localStorage.id);
    },
    saveImg() {
      html2canvas(this.$refs.imageWrapper, {
        useCORS: true
      }).then(canvas => {
        this.imgURL = canvas.toDataURL();
        console.log(999, this.imgURL);
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
            type: "success"
          });
        } else {
          // 这里就按照chrome等新版浏览器来处理
          const a = document.createElement("a");
          a.href = this.imgURL;
          a.setAttribute("download", "chart-download");
          a.click();
          this.$message({
            message: "下载成功",
            type: "success"
          });
        }
      });
    },
    async reject() {
      this.$prompt("请输入退回理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          this.$message({
            type: "success",
            message: "退回理由是: " + value
          });
          this.reportStatus = "未通过";
          await this.$http.put(`rest/erectionReports/${this.id}`, this.model);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang='scss' scoped>
.el-row {
  //   margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  //   border-radius: 4px;
  border: 1px solid rgba(2, 1, 1, 0.13);
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  //   background: #d3dce6;
  //   border: 1px solid red;
  //   box-shadow: 0px 0px 5px #ccc2c293;
}
.bg-purple-light {
  //   background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 40px;
  line-height: 40px;
}
.row-bg {
  padding: 5px 0;
  background-color: #f9fafc;
}
</style>