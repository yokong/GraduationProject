// 服务端入口文件

const express = require("express");
const app = express();

app.set("secret", "12bvckj435czxvnk23");

app.use(express.json());
app.use(require("cors")()); //引入跨域模块

app.use("/uploads", express.static(__dirname + "/uploads")); //托管静态文件

require("./routes/admin")(app); // 引入admin路由文件
require("./plugins/db")(app); // 引入数据库文件

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
