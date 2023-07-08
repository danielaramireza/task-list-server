const express = require("express");
const router = express.Router();

const listaTareas = require("./listaTareas.json");

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
