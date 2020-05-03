const mongoose = require("mongoose");
const Medium = require("../../models/Medium");
const Container = require("../../models/Container");
const InstallationReport = require("../../models/InstallationReport");
const Meter = require("../../models/Meter");
const Account = require("../../models/Account");

const searchAccount = async (req, res) => {
  const model = await Account.find({});
  // supervisor:6 administrator:4 worker6
  let data = {
    worker: 0,
    supervisor: 0,
    administrator: 0,
  };
  model.map((item) => {
    if (item.authority === 1) {
      data.worker += 1;
    } else if (item.authority === 2) {
      data.supervisor += 1;
    } else {
      data.administrator += 1;
    }
  });
  let dataArr = [];
  for (let i in data) {
    console.log(i);
    let temp = {};
    temp.value = data[i];
    if (i === "worker") {
      temp.name = "安装工程师";
    } else if (i === "supervisor") {
      temp.name = "技术主管";
    } else if (i === "administrator") {
      temp.name = "管理员";
    }
    dataArr.push(temp);
  }
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 5,
      data: ["安装工程师", "技术主管", "管理员"],
    },
    series: [
      {
        name: "比例及使用次数",
        type: "pie",
        radius: ["40%", "20%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "10",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [...dataArr],
      },
    ],
  };
  res.send(option);
};
const searchMeter = async (req, res) => {
  const meterModel = await Meter.find({});
  console.log(meterModel);
  const reportModel = await InstallationReport.aggregate([
    {
      $lookup: {
        from: "meters",
        localField: "meter",
        foreignField: "_id",
        as: "meter_info",
      },
    },
  ]);
  console.log(meterModel);
  let reportArr = reportModel.map((item) => item.meter_info.pop());

  let meterArr = meterModel.map((item) => item.meterName);
  console.log(meterArr);
  let obj = {};
  reportArr.map((item) => {
    if (!obj[item.meterName]) {
      obj[item.meterName] = 1;
    } else {
      obj[item.meterName]++;
    }
  });
  let data = [];
  for (let i in obj) {
    let temp = {};
    temp.name = i;
    temp.value = obj[i];
    data.push(temp);
  }
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 5,
      data: meterArr,
    },
    series: [
      {
        name: "比例及使用次数",
        type: "pie",
        radius: ["50%", "30%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "10",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
  res.send(option);
};

const searchMedium = async (req, res) => {
  const mediumModel = await Medium.find({});
  const reportModel = await InstallationReport.aggregate([
    {
      $lookup: {
        from: "media",
        localField: "medium",
        foreignField: "_id",
        as: "medium_info",
      },
    },
  ]);
  let reportArr = reportModel.map((item) => item.medium_info.pop());
  let mediumArr = mediumModel.map((item) => item.mediumName);
  console.log(mediumArr);
  let obj = {};
  reportArr.map((item) => {
    if (!obj[item.mediumName]) {
      obj[item.mediumName] = 1;
    } else {
      obj[item.mediumName]++;
    }
  });
  let data = [];
  for (let i in obj) {
    let temp = {};
    temp.name = i;
    temp.value = obj[i];
    data.push(temp);
  }
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 5,
      data: mediumArr,
    },
    series: [
      {
        name: "比例及使用次数",
        type: "pie",
        radius: ["50%", "30%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "10",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
  res.send(option);
};
const searchContainer = async (req, res) => {
  const containerModel = await Container.find({});
  const reportModel = await InstallationReport.aggregate([
    {
      $lookup: {
        from: "containers",
        localField: "container",
        foreignField: "_id",
        as: "container_info",
      },
    },
  ]);
  console.log(reportModel[1].container_info);
  let reportArr = reportModel.map((item) => item.container_info.pop());
  let containerArr = containerModel.map((item) => item.material);
  // console.log(containerArr);
  let obj = {};
  reportArr.map((item) => {
    console.log(item.material);
    if (!obj[item.material]) {
      obj[item.material] = 1;
    } else {
      obj[item.material]++;
    }
  });
  console.log(obj);
  let data = [];
  for (let i in obj) {
    let temp = {};
    temp.name = i;
    temp.value = obj[i];
    data.push(temp);
  }
  console.log(data);
  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 5,
      data: containerArr,
    },
    series: [
      {
        name: "比例及使用次数",
        type: "pie",
        radius: ["50%", "30%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "10",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
      },
    ],
  };
  res.send(option);
};
// const searchMedium;
// const searchContainer;
module.exports = {
  searchAccount,
  searchMedium,
  searchMeter,
  searchContainer,
};
