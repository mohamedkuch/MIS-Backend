const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config');

///lEtIa5uVhEBltQ9g
const app = express()
const port = process.env.PORT || 3000

// Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("connected to DB !");
  })

// Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//######## ROUTES

//* Students 
const studentsRoutes = require("./routes/students");
app.use('/students', studentsRoutes);

//* Certificates
const certificatesRoutes = require("./routes/certificates");
app.use('/certificates', certificatesRoutes);

//* Machines
const machinesRoutes = require("./routes/machines");
app.use('/machines', machinesRoutes);

//* Workplaces
const workplacesRoutes = require("./routes/workplaces");
app.use('/workplaces', workplacesRoutes);

//* Authentication
const AuthRoutes = require("./routes/auth");
app.use('', AuthRoutes);

//######## Server launch

app.listen(port, () => {
  console.log(`app is listening`)
})


