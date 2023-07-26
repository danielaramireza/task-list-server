const express = require("express");
const router = express.Router();
const {
  db_allCompleteTasks,
  db_allIncompleteTasks,
  db_findOneTask,
} = require("./db_fns");

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
  db_allCompleteTasks()
    .then((response) => {
      const listaTareasBD = response.map((el) => {
        return {
          id: el.id,
          name: el.name,
          description: el.description ? el.description : "",
          isCompleted: el.state,
        };
      });
      res.send({
        success: true,
        content: listaTareasBD,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        content: "Ocurrio un error consultando las tareas.",
      });
    });
});

router.get("/incompletas", (req, res) => {
  db_allIncompleteTasks()
    .then((response) => {
      const listaTareasBD = response.map((el) => {
        return {
          id: el.id,
          name: el.name,
          description: el.description ? el.description : "",
          isCompleted: el.state,
        };
      });
      res.send({
        success: true,
        content: listaTareasBD,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        content: "Ocurrio un error consultando las tareas.",
      });
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  db_findOneTask(id)
    .then((response) => {
      if (response) {
        const listaTareasBD = {
          id: response.id,
          name: response.name,
          description: response.description ? response.description : "",
          isCompleted: response.state,
        };
        res.send({
          success: true,
          content: listaTareasBD,
        });
      } else {
        res.send({
          success: false,
          content: "No se encontró la tarea.",
        });
      }
    })
    .catch((err) => {
      res.send({
        success: false,
        content: "Ocurrio un error consultando las tareas.",
      });
    });
});

module.exports = router;
