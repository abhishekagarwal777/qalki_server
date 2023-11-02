require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");

//connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const authadminRouter = require("./routes/authAdmin");
const adminRouter = require("./routes/admin");
const bookRouter = require("./routes/book");
const chapterRouter = require("./routes/chapter");
const storyRouter = require("./routes/story");
const questionRouter = require("./routes/question");
const oauthRouter = require("./routes/OAuth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//cors middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/authadmin", authadminRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/chapter", chapterRouter);
app.use("/api/v1/story", storyRouter);
app.use("/api/v1/question", questionRouter);
app.use("/api/v1/oauth", oauthRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
