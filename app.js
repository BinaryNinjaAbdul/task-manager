const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const connectDB = require("./server/config/db");
const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASS),
    })
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"))

// Static File
app.use(express.static("public"));

// Connect DB
connectDB();

// Templating Engine
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

// Routes
app.use("/", require("./server/routes/index"));
app.use("/", require("./server/routes/auth"));
app.use("/", require("./server/routes/dashboard"));

// Handle 404
app.use("*", function (req, res) {
  // res.status(404).send('404 Page not found.')
  res.status(404).render("404");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
