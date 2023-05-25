const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const errors = require("./helpers/errors");
const errorController = require("./global-controllers/errorController");
const pizzaRoutes = require("./routers/pizzaRouter")();
const weaponRoutes = require("./routers/weaponRouter")();
const turtleRoutes = require("./routers/turtleRouter")();
const turtleController = require("./controllers/turtleController");

// Конфигурация хранилища для загружаемых файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "turtle_" + req.body.turtleId + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let app = express();

// Использование body-parser для разбора JSON-тела запросов
app.use(bodyParser.json({ extended: false }));

// Разрешение доступа к статическим файлам в папке "images"
app.use("/images", express.static(path.join(__dirname, "images")));

// Middleware для проверки существования запрашиваемого изображения
app.use("/images", (req, res, next) => {
  const filePath = path.join(__dirname, "images", req.path);

  if (!fs.existsSync(filePath)) {
    res.status(404).send("Image not found");
  } else {
    next();
  }
});

// Маршрут для отображения главной страницы
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Маршрут для отображения страницы загрузки изображения
app.get("/upload", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});

// Маршрут для загрузки изображения с использованием multer
app.post("/upload", upload.single("image"), async (req, res, next) => {
  turtleController.uploadTurtleImage(req, res, next);
});

// Маршруты для API пицц, оружия и черепах
app.use("/api/pizzas/", pizzaRoutes);
app.use("/api/weapons/", weaponRoutes);
app.use("/api/turtles/", turtleRoutes);

// Middleware для обработки несуществующих ресурсов
app.use((req, res, next) => {
  res.error(errors.resourseNotFound);
});

// Middleware для обработки ошибок
app.use(errorController);

// Запуск сервера на порту 3000
app.listen(3000, () => console.log("Сервер запущен на http://localhost:3000"));