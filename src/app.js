require('dotenv-safe').config();
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()


mongoose.connect(process.env.MONGODB_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});


let db = mongoose.connection;


db.on("error", console.log.bind(console, "connection error:"))
db.once("open", function (){
  console.log("conexão feita com sucesso.")
})


const index = require("./routes/index")
const tarefas = require("./routes/tarefasRoute")
const colaboradoras = require("./routes/colaboradorasRoute")


app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    )
    next()
  })

app.use("/", index)
app.use("/tarefas", tarefas)
app.use("/colaboradoras", require("./routes/colaboradorasRoute"))

module.exports = app
