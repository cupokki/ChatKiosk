const express = require("express");
// const {} = require("openai");


const app = express();


app.use(express.json());
// app.use(cors());

app.get("/", (req, res)=>{
    res.send("hellssdddssoword");
});

app.listen(3000 || process.env.port);