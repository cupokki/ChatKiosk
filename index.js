const express = require("express");
const session = require('express-session');

const cors = require("cors");
const dotenv = require('dotenv')
const completionRouter = require('./routes/completion');

dotenv.config();

const app = express();
  
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: 'mysecretkey', // 세션 암호화에 사용되는 키 값
  resave: false, // 요청이 왔을 때 세션을 다시 저장할 지 여부를 설정합니다.
  saveUninitialized: true, // 세션이 저장되기 전에 uninitialized 상태로 미리 만들어서 저장합니다.
  cookie: {
    maxAge: 1800000, // 30 minutes
  },
}));

app.use("/completion", completionRouter);
app
  .get("*",(req, res)=>{
    res.send("Not Found")
  })


app.listen(process.env.port, ()=>{
  console.log(`Server listening on ${process.env.port}`)
});
