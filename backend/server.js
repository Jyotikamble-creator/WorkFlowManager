const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb>//localhost:3000/workflow",{
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected"))

    .catch(err => console.log(err));
const workflowRoutes = require("./routes/workflowRoutes");
app.use("/api/workflows", workflowRoutes);


app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));


app.listen(3000, () => {
    console.log("Server started on port 3000");
});

