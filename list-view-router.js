const express = require("express");
const router = express.Router();

const listaTareas = require("./listaTareas.json");

const paramMiddleware = (req, res, next) => {
  const param = req.params.param;

  if (param == "completas" || param == "incompletas" || parseInt(param) >= 0) {
    next();
    return;
  } else {
    return res.status(400).send({
      success: false,
      content: "Parametro invalido",
    });
  }
  next();
};

router.use("/:param", paramMiddleware);

router.get("/completas", (req, res) => {
  let tareasCompletas = listaTareas.filter(
    (tarea) => tarea.isCompleted === true
  );
  res.send({ success: true, content: tareasCompletas });
});

router.get("/incompletas", (req, res) => {
  let tareasIncompletas = listaTareas.filter(
    (tarea) => tarea.isCompleted === false
  );
  res.send({ success: true, content: tareasIncompletas });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  let indice = listaTareas.findIndex((objeto) => objeto.id === id);

  if (indice >= 0) {
    res.send({
      success: true,
      content: listaTareas[indice],
    });
  } else {
    res.status(404).send({
      succes: false,
      content: "No se encontro la tarea",
    });
  }
});

module.exports = router;
