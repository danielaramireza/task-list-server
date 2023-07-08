const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let listaTareas = [
  { id: 1, description: "Hacer el desayuno", isCompleted: false },
  { id: 3, description: "Ir al supermercado", isCompleted: false },
  { id: 2, description: "Sacar la basura", isCompleted: false },
  { id: 4, description: "Pasear el perro", isCompleted: false },
];

app.get("/", (req, res) => {
  res.send({
    success: true,
    content: listaTareas,
  });
});

app.listen(port, () => {
  console.log("Servidor inicializado en " + port);
});
