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
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
})
app.get('/', (request, response) => {
  response.json('There is nothing so useless as doing efficiently that which should not be done at all. – Peter Drucker')
})

//app.get('/users', db.getUsers)
app.get('/alldatatab2', db.getAllDataTab2)
app.get('/alldatatab1', db.getAllDataTab1)
app.get('/alldatatab3', db.getAllDataTab3)

app.post('/createlinetab2', db.createLineTab2)
app.post('/createlinetab1', db.createLineTab1)
app.post('/createlinetab3', db.createLineTab3)

app.delete('/deletelinetab2/:data/:title', db.deleteLineTab2)
app.delete('/deletelinetab2/:data/', db.deleteLineTab2)
app.delete('/deletelinetab1/:data/:title', db.deleteLineTab1)
app.delete('/deletelinetab1/:data/', db.deleteLineTab1)
app.delete('/deletelinetab3/:data/:tittle', db.deleteLineTab3)
app.delete('/deletelinetab3/:data/', db.deleteLineTab3)

app.put('/updatelinetab2/:data/:title', db.updateLineTab2)
app.put('/updatelinetab2/:data/', db.updateLineTab2)

app.put('/updatedatalinetab1/:data/:title', db.updateDataLineTab1)
app.put('/updatedatalinetab1/:data/', db.updateDataLineTab1)
app.put('/updatetitlelinetab1/:data/:title', db.updateTitleLineTab1)
app.put('/updatetitlelinetab1/:data/', db.updateTitleLineTab1)

app.put('/updatetitlelinetab3/:data/', db.updateLineTab3)
app.put('/updatetitlelinetab3/:data/:title', db.updateLineTab3)


//app.get('/diary', db.getDiary)
//app.get('/users/:id', db.getUserById)
//app.post('/users', db.createUser)
//app.put('/users/:id', db.updateUser)
//app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})