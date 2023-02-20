require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const categoryRoutes = require("./routes/categoryRoutes");
const companyRoutes = require("./routes/companyRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const { userRouter } = require("./routes/user.route.js");
global.__basedir = __dirname;
const app = express();
const PORT = process.env.PORT || 5000;

// database connection
connection();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// routes
//all router
app.use("/api/users", userRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/companys", companyRoutes);
app.use("/api/file", uploadRoutes);

// listening on port
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
