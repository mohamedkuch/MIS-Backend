const express = require('express')
const app = express()
const port = 3000



// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.get('/posts', (req, res) => {
  res.send('we are in posts');
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})