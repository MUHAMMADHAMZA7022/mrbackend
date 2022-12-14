const express = require("express");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
const fileupload = require("express-fileupload");
const coookieparser = require("cookie-parser");
app.use(express.json());
app.use(coookieparser());
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  Credentials: true,

  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(
  fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.get('/', (req, res) => {
  res.send('Hello API')
})

const errormiddleware = require("./middleware/error");
// usser routes
const user = require("./routers/userroute");
app.use("/api/v1/user", user); 
// course routes
const course = require("./routers/courseroute");
app.use("/api/v1/course", course); 
// event routes
const event = require("./routers/eventroute");
app.use("/api/v1/event", event); 
//service routes
const service = require("./routers/serviceroute");
app.use("/api/v1/service", service); 
//order routes
const order = require("./routers/orderroute");
app.use("/api/v1/order", order); 
app.use(errormiddleware);
module.exports = app;

