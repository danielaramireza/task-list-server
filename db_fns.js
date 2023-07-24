const mongoose = require("mongoose");
const connectDb = require("./db.js");
const TaskModel = require("./task-model.js");

function db_allTasks() {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
        const tasks = await TaskModel.find();
        mongoose.connection.close();
        resolve(tasks);
      });
    } catch {
      reject();
    }
  });
}

function db_allCompleteTasks() {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
        const tasks = await TaskModel.find({ state: true });
        mongoose.connection.close();
        resolve(tasks);
      });
    } catch {
      reject();
    }
  });
}

function db_allIncompleteTasks() {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
        const tasks = await TaskModel.find({ state: false });
        mongoose.connection.close();
        resolve(tasks);
      });
    } catch {
      reject();
    }
  });
}

function db_findOneTask(id) {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
        const tasks = await TaskModel.findOne({ id: id });
        mongoose.connection.close();
        resolve(tasks);
      });
    } catch {
      reject();
    }
  });
}

function db_createTask(id, name, description = null) {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
        await TaskModel.create({
          id: id,
          name: name,
          description: description,
          state: false,
          user_id: new mongoose.mongo.ObjectId("64b4165c1d224c057285566c"),
        });
        mongoose.connection.close();
        resolve(true);
      });
    } catch {
      reject();
    }
  });
}

function db_updateStateTask(
  id,
  user_id,
  name = null,
  description = null,
  state = null
) {
  return new Promise((resolve, reject) => {
    try {
      connectDb().then(async () => {
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
        resolve(res.modifiedCount);
        mongoose.connection.close();
      });
    } catch {
      reject();
    }
  });
}

function db_deleteTask(id, user_id) {
  try {
    connectDb().then(async () => {
      const res = await TaskModel.deleteOne({
        id: id,
        user_id: new mongoose.mongo.ObjectId(user_id),
      });
      resolve(res.deletedCount);
      mongoose.connection.close();
    });
  } catch {
    reject();
  }
}

module.exports = {
  db_allTasks,
  db_allCompleteTasks,
  db_allIncompleteTasks,
  db_findOneTask,
  db_createTask,
  db_updateStateTask,
  db_deleteTask,
};
