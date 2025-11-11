require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/common/connect");

const app = express();

// ⚙️ Cấu hình CORS CHÍNH XÁC
const allowedOrigin = "https://blog.preecostudio.com";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ⚙️ Đảm bảo preflight OPTIONS request cũng trả về header đúng
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Các router của bạn
require("./app/routers/employee-router")(app);

let port = process.env.PORT || 3306;
app.listen(port, () => {
  console.log("RESTful API server started on port: " + port);
});

// require("dotenv").config();
// const express = require("express");
// const app = express();
// const db = require("./app/common/connect");

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', '*');
//   res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.set('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// });

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());


// require("./app/routers/employee-router")(app);



// let port = process.env.PORT || 3306;

// app.listen(port);

// console.log('RESTful API server started on: ' + port);