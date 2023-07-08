const express = require("express");
const router = express.Router();

router.use(express.json());

let listaTareas = require("./listaTareas.json");

//Función para retornar el último id
function retornarUltimoId() {
  const ultimoId = listaTareas.reduce((max, objeto) => {
    if (objeto.id > max) {
      return objeto.id;
    }
    return max;
  }, 0);
  return ultimoId + 1;
}

//Función para eliminar una tarea(objeto) existente de la lista(array)
function eliminarTarea(id) {
  id = parseInt(id);
  let indice = listaTareas.findIndex((objeto) => objeto.id === id);

  if (indice >= 0) {
    listaTareas.splice(indice, 1);
    return true;
  } else {
    return false;
  }
}

router.post("/nueva", (req, res) => {
  const tarea = req.body;
  if (tarea.description) {
    let nuevaTarea = {
      id: retornarUltimoId(),
      description: tarea.description,
      isCompleted: false,
    };
    listaTareas.push(nuevaTarea);
    res.send({
      success: true,
      content: "Se agrego una nueva tarea a la lista",
    });
  } else {
    res.status(400).send({
      success: false,
      content: "Debes enviar la descripcion de la tarea",
    });
  }
});

router.delete("/eliminar/:id", (req, res) => {
  const id = req.params.id;
  let tareaEliminada = eliminarTarea(id);
  if (tareaEliminada === true) {
    res.send({
      success: true,
      content: "La tarea ha sido eliminada",
    });
  } else {
    res.send({
      succes: false,
      content: "La tarea no pudo ser eliminada, verifica el id de la tarea",
    });
  }
});

router.put("/actualizar/:id", (req, res) => {
  const id = req.params.id;
  const tareaBody = req.body;
  const tarea = listaTareas.find((tarea) => tarea.id == id);

  if (tarea) {
    if (tareaBody.description) {
      tarea.description = tareaBody.description;
    }
    if (tareaBody.isCompleted === true || tareaBody.isCompleted === false) {
      tarea.isCompleted = tareaBody.isCompleted;
    }
    res.send({
      success: true,
      content: "Su tarea ha sido actualizada correctamente",
    });
  } else {
    res.send({
      success: false,
      content: "No se pudo actualizar la tarea, verifica los datos enviados.",
    });
  }
});

module.exports = router;
