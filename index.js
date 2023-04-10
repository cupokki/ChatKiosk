const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const completionRouter = require('./routers/completion');

dotenv.config();

const app = express();
  
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.use("/completion", completionRouter);

app.listen(process.env.port, ()=>{
  console.log(`Server listening on ${process.env.port}`)
});
