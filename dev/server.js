const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/project", require("./routes/projectRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/profession", require("./routes/professionRoutes"));
app.use("/api/post", require("./routes/postRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));
