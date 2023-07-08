const express = require("express");
const app = express();
const port = 3000;
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const listaTareas = require("./listaTareas.json");

app.use(express.json());
app.use("/tareas", listViewRouter);
app.use("/tarea", listEditRouter);

app.get("/", (req, res) => {
  res.send({
    success: true,
    content: listaTareas,
  });
});

app.listen(port, () => {
  console.log("Servidor inicializado en " + port);
});
