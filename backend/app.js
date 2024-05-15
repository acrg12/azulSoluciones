const express = require("express");
const cors = require("cors");
const path = require("path");

const RutaUsuarios = require("./router/Usuario");


const app = express();
require("./model/Conexion");
const puerto = 3600;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(express.static(path.join(__dirname, "upload"))); */



app.use("/", RutaUsuarios);



app.listen(puerto, () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3600");
});