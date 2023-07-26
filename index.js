const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const env = dotenv.config();
const port = 3000;
const cors = require("cors");
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const listaTareas = require("./listaTareas.json");
const { db_allTasks } = require("./db_fns");

app.use(cors());

const users = [
  { email: "damaral@gmail.com", name: "Daniela" },
  { email: "sevepo@gmail.com", name: "Sebastian" },
  { email: "clapagaos@gmail.com", name: "Claudia" },
  { email: "luguera@gmail.com", name: "Luciana" },
  { email: "anferal@gmail.com", name: "Andres" },
];

app.use(express.json());

function JWTValidation(req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    res.status(401).send({ message: "Invalid token" });
    return;
  }

  const dataToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(dataToken, env.parsed.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid token" });
  }
}

app.use("/tareas", JWTValidation, listViewRouter);
app.use("/tarea", JWTValidation, listEditRouter);

app.use(function (req, res, next) {
  switch (req.method) {
    case "POST":
    case "GET":
    case "PUT":
    case "DELETE":
      next();
      break;

    default:
      return res.status(400).send({
        success: false,
        content: "Metodo inválido",
      });
  }
});

app.get("/", JWTValidation, (req, res) => {
  db_allTasks()
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

app.post("/login", (req, res) => {
  const email = req.body.email;
  const user = users.find((user) => user.email === email);

  if (!user) {
    res.status(401).send({ error: "Invalid user name or password" });
  } else {
    const token = jwt.sign(user, env.parsed.SECRET_KEY, {
      algorithm: "HS256",
    });
    res.json({ token });
  }
});

app.listen(port, () => {
  console.log("Servidor inicializado en " + port);
});
