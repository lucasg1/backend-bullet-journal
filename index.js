const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
app.get('/', (request, response) => {
  response.json('There is nothing so useless as doing efficiently that which should not be done at all. – Peter Drucker')
})

//app.get('/users', db.getUsers)
app.get('/alldatatab2', db.getAllDataTab2)
app.post('/createlinetab2', db.createLineTab2)
//app.get('/diary', db.getDiary)
//app.get('/users/:id', db.getUserById)
//app.post('/users', db.createUser)
//app.put('/users/:id', db.updateUser)
//app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})