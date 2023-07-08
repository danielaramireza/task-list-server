const express = require("express");
const router = express.Router();

const listaTareas = require("./listaTareas.json");

const paramMiddleware = (req, res, next) => {
  const param = req.params.param;

  switch (param) {
    case "completas":
    case "incompletas":
      next();
      break;

    default:
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

module.exports = router;
