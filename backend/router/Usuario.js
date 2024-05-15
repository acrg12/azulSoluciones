const express = require("express");
const router = express.Router();
const UserController = require("../controller/usuario");
const auth = require("../controller/Auth");

router.post("/usuarios/agregar", UserController.AgregarUsuario);

router.post("/usuarios/login", UserController.login);

router.post("/usuarios/verificarCodigo", UserController.verificarCodigo);

router.post("/usuarios/enviarCorreo", UserController.enviarCorreo);
//Ruta para actualizar contraseña
router.put("/usuarios/actualizarPass", UserController.ActualizarPass);

router.put("/usuarios/editar/:id", auth, UserController.EditarUsuario);

router.delete("/usuarios/eliminar/:id", auth, UserController.EliminarUsuario);

router.get("/usuarios/listar", UserController.ListarTodosUsuarios);

router.get("/usuarios/listarUno/:id", auth, UserController.ListarUnUsuario);

router.get("/usuarios/listarXCorreo/:id", UserController.ListarXCorreo);

module.exports = router;