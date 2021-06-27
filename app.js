const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const app = express()
const port = process.env.PORT || 3000


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Luca Certificate API',
      description: 'backend documentation of the current implementation of the MIS project <Luca Certificate>',
      contact: {
        name: "Mohamed Kechaou"
      },
      servers: ["http://localhost:3000"]
    }
  },
  apis: ["routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));




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


