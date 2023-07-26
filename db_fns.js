const mongoose = require("mongoose");
const connectDb = require("./db.js");
const TaskModel = require("./task-model.js");

async function db_allTasks() {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta
    const tasks = await TaskModel.find();
    return tasks;
  } catch (error) {
    throw new Error("Error al obtener las tareas");
  }
}

async function db_allCompleteTasks() {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const tasks = await TaskModel.find({ state: true });
    return tasks;
  } catch (error) {
    throw new Error("Error al obtener las tareas completadas");
  }
}

async function db_allIncompleteTasks() {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const tasks = await TaskModel.find({ state: false });
    return tasks;
  } catch (error) {
    throw new Error("Error al obtener las tareas incompletas");
  }
}

async function db_findMaxId(user_id) {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const tasks = await TaskModel.findOne({
      user_id: new mongoose.mongo.ObjectId(user_id),
    }).sort({ id: -1 });

    return tasks ? tasks?.id + 1 : 1;
  } catch (error) {
    throw new Error("Error al obtener las tareas incompletas");
  }
}

async function db_findOneTask(id) {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const task = await TaskModel.findOne({ id: id });
    return task;
  } catch (error) {
    throw new Error("Error al encontrar la tarea");
  }
}

async function db_createTask(id, name, description = null) {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    await TaskModel.create({
      id: id,
      name: name,
      description: description,
      state: false,
      user_id: new mongoose.mongo.ObjectId("64b4165c1d224c057285566c"),
    });
    return true;
  } catch (error) {
    throw new Error("Error al crear la tarea");
  }
}

async function db_updateTask(
  id,
  user_id,
  name = null,
  description = null,
  state = null
) {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const updateFields = {};
    if (name !== null) {
      updateFields.name = name;
    }

    if (description !== null) {
      updateFields.description = description;
    }

    if (state !== null) {
      updateFields.state = state;
    }

    const res = await TaskModel.updateOne(
      { id: id, user_id: new mongoose.mongo.ObjectId(user_id) },
      updateFields
    );

    return res.modifiedCount;
  } catch (error) {
    throw new Error("Error al actualizar la tarea");
  }
}

async function db_deleteTask(id, user_id) {
  try {
    await connectDb; // Esperar a que la conexión esté lista antes de hacer la consulta

    const res = await TaskModel.deleteOne({
      id: id,
      user_id: new mongoose.mongo.ObjectId(user_id),
    });

    return res.deletedCount;
  } catch (error) {
    throw new Error("Error al eliminar la tarea");
  }
}

module.exports = {
  db_allTasks,
  db_allCompleteTasks,
  db_allIncompleteTasks,
  db_findOneTask,
  db_createTask,
  db_updateTask,
  db_deleteTask,
  db_findMaxId,
};
