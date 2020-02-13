// 服务端入口文件

const express = require("express");
const app = express();

app.use(express.json());
app.use(require("cors")()); //引入跨域模块

require("./routes/admin")(app); // 引入admin路由文件
require("./plugins/db")(app); // 引入数据库文件

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
