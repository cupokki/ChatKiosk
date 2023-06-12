const express = require("express");
const session = require('express-session');

const http = require('http')
const https = require('https')
const fs = require('fs')
const cors = require("cors");
const dotenv = require('dotenv')
const completionRouter = require('./routes/completion');
const menuApiRouter = require('./routes/menu');//TODO:
const voiceApiRouter = require('./routes/voice');

dotenv.config();

const app = express();
  
// app.use(bodyParser.json());
const corsOptions = {
  origin: 'https://localhost:3000', // 허용할 도메인
  credentials: true, // 쿠키 전달 여부
};

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/chatkiosk.hopto.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/chatkiosk.hopto.org/fullchain.pem')
};

// CORS 미들웨어 적용
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser('mysecretkey'));
app.use(session({
  secret: 'mysecretkey', // 세션 암호화에 사용되는 키 값
  resave: false, // 요청이 왔을 때 세션을 다시 저장할 지 여부를 설정합니다.
  saveUninitialized: true, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.
  cookie: {
    maxAge: 1800000, // 30 minutes
  },
}));

app.use("/completion", completionRouter);
app.use("/menu", menuApiRouter);
app.use("/voice", voiceApiRouter);

app
  .get("*",(req, res)=>{
    res.status(404).send("Not Found")
  })


// app.listen(process.env.port, ()=>{
//   console.log(`Server listening on ${process.env.port}`)
// });

https.createServer(options, app).listen(process.env.port, ()=>{
  console.log(`Server listening on ${process.env.port}`)
});
