const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config');

///lEtIa5uVhEBltQ9g
const app = express()
const port = 3000

// Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true , useNewUrlParser: true } ).then(() => {
    console.log("connected to DB !");
  })

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
const studentsRoutes = require("./routes/students");
app.use('/students', studentsRoutes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




