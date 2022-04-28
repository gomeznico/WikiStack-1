const express = require("express");
const morgan = require("morgan");
const { db, Page, User } = require("./models");
// const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");
const app = express();

db.authenticate().then(() => {
  console.log("connected to the database");
});
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/wiki", require("./routes/wiki"));
app.use("/users", userRouter);

// const layout = require("./view/layout");

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

const PORT = 1337;

const init = async () => {
  await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
