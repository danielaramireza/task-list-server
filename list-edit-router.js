const express = require("express");
const router = express.Router();

router.use(express.json());

let listaTareas = require("./listaTareas.json");

// Middleware de validación para solicitudes POST con el cuerpo vacio
const validatePOSTRequestNoBody = function (req, res, next) {
  if (req.method === "POST" && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      success: false,
      content: "El cuerpo de la solicitud debe contener información",
    });
  }
  next();
};

// Registra el middleware en el router
router.use(validatePOSTRequestNoBody);

// Middleware de validación para solicitudes POST que tengan información no valida o atributos faltantes para crear las tareas
const validatePOSTRequestInvalid = function (req, res, next) {
  if (
    (req.method === "POST" && "name" in req.body === false) ||
    (req.method === "POST" && typeof req.body.name !== "string")
  ) {
    return res.status(400).send({
      success: false,
      content:
        "Verifica la informacion enviada en el cuerpo. Recuerda que la descripcion es obligatoria y esta debe ser de tipo 'string'",
    });
  }
  next();
};

// Registra el middleware en el router
router.use(validatePOSTRequestInvalid);

// Middleware de validación para solicitudes PUT con el cuerpo vacio
const validatePUTRequestNoBody = function (req, res, next) {
  if (req.method === "PUT" && Object.keys(req.body).length === 0) {
    return res.status(400).send({
      success: false,
      content: "El cuerpo de la solicitud debe contener información",
    });
  }
  next();
};

// Registra el middleware en el router
router.use(validatePUTRequestNoBody);

// Middleware de validación para solicitudes PUT que tengan información no valida o atributos faltantes para crear las tareas
const validatePUTRequestInvalid = function (req, res, next) {
  const { name, isCompleted } = req.body;

  if (req.method === "PUT" && !name && isCompleted === undefined) {
    return res.status(400).send({
      success: false,
      content:
        "Debes enviar al menos uno de los parámetros: name o isCompleted.",
    });
  }

  if (name && typeof name !== "string") {
    return res.status(400).send({
      success: false,
      content:
        "El parámetro name debe ser un string si está presente en la solicitud.",
    });
  }

  if (isCompleted !== undefined && typeof isCompleted !== "boolean") {
    return res.status(400).send({
      success: false,
      content:
        "El parámetro isCompleted debe ser un booleano si está presente en la solicitud.",
    });
  }
  next();
};

// Registra el middleware en el router
router.use(validatePUTRequestInvalid);

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
  if (tarea.name) {
    let nuevaTarea = {
      id: retornarUltimoId(),
      name: tarea.name,
      description: tarea.description ? tarea.description : null,
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
    res.status(404).send({
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
    if (tareaBody.name) {
      tarea.name = tareaBody.name;
    }
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
    res.status(404).send({
      success: false,
      content: "No se pudo actualizar la tarea, verifica los datos enviados.",
    });
  }
});

module.exports = router;
