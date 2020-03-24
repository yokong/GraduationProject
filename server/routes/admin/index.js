/*
 * @Author: your name
 * @Date: 2020-02-12 16:45:34
 * @LastEditTime: 2020-03-09 23:06:14
 * @LastEditors: 赵昱青
 * @Description: In User Settings Edit
 * @FilePath: \King\server\routes\admin\index.js
 */
// admin 路由文件
module.exports = app => {
  const express = require("express");
  const router = express.Router({
    // 合并url参数 把父级路由参数合并到子路由里面让子路由也拿得到
    // mergeParams: true
    mergeParams: true
  });

  // 引入模型
  const Meter = require("../../models/Meter");
  const Account = require("../../models/Account");

  // const Erectionreport = require("../../models/Erectionreport.js");

  // 引入jsonwebtoken
  const jwt = require("jsonwebtoken");
  // 引入http-assert
  const assert = require("http-assert");

  // 创建接口
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    // console.log("333", req.Model);
    res.send(model);
  });
  // 列表接口
  router.get(
    "/",
    // 校验中间件 校验用户 首先要获取信息一般都在请求头上传
    async (req, res, next) => {
      // 获取到token
      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      assert(token, 401, "请先登录(jwt-token错误)");
      const tokenData = jwt.verify(token, app.get("secret"));
      const id = tokenData.id;
      assert(id, 401, "请先登录(无效的jwt-token)");
      // console.log(id);
      req.user = await Account.findById(id);
      assert(req.user, 401, "请先1登录");
      // console.log(user);
      // console.log(tokenData);
      await next();
    },
    async (req, res) => {
      const queryOptions = {};
      // console.log(req.Model.modelName);

      if (req.Model.modelName == "Erectionreport") {
        const items = await req.Model.aggregate([
          {
            $lookup: {
              from: "accounts",
              localField: "supervisor",
              foreignField: "_id",
              as: "supervisor_info"
            }
          },
          {
            $lookup: {
              from: "meters",
              localField: "meter",
              foreignField: "_id",
              as: "meter_info"
            }
          }
        ]);
        // console.log(myData, "1231232");
        res.send(items);
      } else {
        const items = await req.Model.find()
          .setOptions(queryOptions)
          .limit(100);
        res.send(items);
      }
      // .populate('meter')
    }
  );

  // 详情页面接口-编辑页面-加了个id
  router.get(
    "/:id", // 校验中间件 校验用户 首先要获取信息一般都在请求头上传
    async (req, res, next) => {
      // 获取到token
      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      assert(token, 401, "请先登录(jwt-token错误)");
      const tokenData = jwt.verify(token, app.get("secret"));
      const id = tokenData.id;
      assert(id, 401, "请先登录(无效的jwt-token)");
      // console.log(id);
      req.user = await Account.findById(id);
      assert(req.user, 401, "请先1登录");
      // console.log(user);
      // console.log(tokenData);
      await next();
    },
    async (req, res) => {
      const model = await req.Model.findById(req.params.id);
      // console.log(req.url);
      res.send(model);
    }
  );
  // 修改分类接口
  router.put(
    "/:id", // 校验中间件 校验用户 首先要获取信息一般都在请求头上传
    async (req, res, next) => {
      // 获取到token
      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      assert(token, 401, "请先登录(jwt-token错误)");
      const tokenData = jwt.verify(token, app.get("secret"));
      const id = tokenData.id;
      assert(id, 401, "请先登录(无效的jwt-token)");
      // console.log(id);
      req.user = await Account.findById(id);
      assert(req.user, 401, "请先登录");
      // console.log(user);
      // console.log(tokenData);
      await next();
    },
    async (req, res) => {
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
      res.send(model);
    }
  );
  // 删除分类接口
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    });
  });

  // 挂载路由
  // 为了进行通用CRUD改造后台接口为动态参数
  app.use(
    "/admin/api/rest/:resource",
    // 校验中间件 校验用户 首先要获取信息一般都在请求头上传
    async (req, res, next) => {
      // 获取到token
      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      assert(token, 401, "请先登录(jwt-token错误)");
      const tokenData = jwt.verify(token, app.get("secret"));
      const id = tokenData.id;
      assert(id, 401, "请先登录(无效的jwt-token)");
      // console.log(id);
      req.user = await Account.findById(id);
      assert(req.user, 401, "请先1登录");
      // console.log(user);
      // console.log(tokenData);
      await next();
    },
    // 使用中间件保证所有子路由都能获取到req上挂载的Model(模型名称)
    async (req, res, next) => {
      // console.log(req.baseUrl);
      // inflection包--用来转换名称 这里是将 req.params.resource(动态路径)转为类名形式(首字母大写 单数)
      const modelName = require("inflection").classify(req.params.resource);
      // 给请求对象上挂载一个Model
      req.Model = require(`../../models/${modelName}`);
      // console.log("123123", req.Model);
      next();
    },
    router
  );

  const multer = require("multer"); // 用来做文件上传的模块
  // 文件上传到哪里 upLoad中间件
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post("/admin/api/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    // console.log(123456);
    // console.log(file);
    file.url = `http://localhost:3000/uploads/${file.filename}`;
    res.send(file);
  });

  // 登录接口
  app.post("/admin/api/login", async (req, res) => {
    const { account, password } = req.body;
    // 1.根据账号 查找用户
    const user = await Account.findOne({ account }).select("+password");
    assert(user, 422, "用户不存在");
    // if (!user) {
    //   return res.status(422).send({
    //     message: "用户不存在"
    //   });
    // }
    // 2.校验密码
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    // if (!isValid) {
    //   return res.status(422).send({
    //     message: "密码错误"
    //   });
    // }
    // 3.返回token
    // jwt.sign 生成一个token 1.数据 2.secret
    const token = jwt.sign(
      {
        id: user._id,
        account: user.account,
        authority: user.authority,
        name: user.name
      },
      app.get("secret")
    );
    // console.log(token);

    res.send({ token, authority: user.authority, account: user.account });
  });

  // 错误处理
  app.use(async (err, req, res, next) => {
    // console.log(err);
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
