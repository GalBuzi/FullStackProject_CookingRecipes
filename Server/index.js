require("dotenv").config();
// ---- libraries importing
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("client-sessions");
const cors = require("cors");

// ---- Routes importing
const auth = require("./routes/auth");
const users = require("./routes/users");
const recipes = require("./routes/recipes");

// ---- App setting and config
const app = express();
const port = process.env.PORT || "4000";

// parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//print requests log
app.use(morgan(" :method :url :status :response-time ms"));

app.set("trust proxy");
//settings cookie config
app.use(
  session({
    cookieName: "session", // cookie name
    secret: process.env.COOKIE_SECRET, //encryption key
    duration: 1000 * 60 * 60 * 12, // expired after ...
    activeDuration: 0, // if expiresIn < activeDuration,
    // the session will be extended by activeDuration ms
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
);

const corsConfig = {
  origin: true,
  credentials: true,
};

// Letting all origins to pass
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// letting a custom origin to pass
// app.use(
//   cors({
//     origin: "http://127.0.0.1:4141" //should be origin of the server
//   })
// );

app.get("/alive", (req, res) => {
  //general endpoint to verify the server is up
  res.send("I'm alive");
});

// Routing
app.use("/users", users); //route to users
app.use("/recipes", recipes);
app.use(auth); //route directly to register/login

// default route
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "server error",
    },
  });
  res.sendStatus(404); //Not Found
});

// server up
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
