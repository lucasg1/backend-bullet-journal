const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getAllDataTab2 = (request, response) => {
  pool.query('SELECT * FROM diary', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllDataTab1 = (request, response) => {
  var user_email = request.headers['authorization']
  //console.log('the header has value '+ user_email)
  pool.query('SELECT * FROM tab1 WHERE email = $1',[user_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllDataTab3 = (request, response) => {
  var user_email = request.headers['authorization']
  pool.query('SELECT * FROM tab3 WHERE email = $1',[user_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createLineTab2 = (request, response) => {
  const { data, title, tag, evento } = request.body

  pool.query('INSERT INTO diary (data, title, tag, evento) VALUES ($1, $2, $3, $4)', [data, title, tag, evento], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Line created`)
  })
}

const createLineTab1 = (request, response) => {
  var user_email = request.headers['authorization']
  const { data, title, tag, evento } = request.body

  pool.query('INSERT INTO tab1 (email, data, title, tag, evento) VALUES ($1, $2, $3, $4, $5)', [user_email, data, title, tag, evento], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Line created`)
  })
}

const createLineTab3 = (request, response) => {
  var user_email = request.headers['authorization']
  const { data, title, tag, evento } = request.body

  pool.query('INSERT INTO tab3 (email, data, title, tag, evento) VALUES ($1, $2, $3, $4, $5)', [user_email, data, title, tag, evento], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Line created`)
  })
}

const deleteLineTab2 = (request, response) => {
  //const id = parseInt(request.params.id)
  var data = request.params.data
  var title = request.params.title
  if(title === undefined) title = ""
  console.log('deleting line from tab2 with data = ' + data + ' and title = ' + title)

  pool.query('DELETE FROM diary WHERE data = $1 AND title = $2', [data, title], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Line deleted`)
  })
}

const deleteLineTab1 = (request, response) => {
  var user_email = request.headers['authorization']
  //const id = parseInt(request.params.id)
  var data = request.params.data
  var title = request.params.title
  if(title === undefined) title = ""
  console.log('deleting line from tab1 with data = ' + data + ' and title = ' + title)

  pool.query('DELETE FROM tab1 WHERE data = $1 AND title = $2 AND email = $3', [data, title, user_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Line deleted`)
  })
}

const deleteLineTab3 = (request, response) => {
  var user_email = request.headers['authorization']
  //const id = parseInt(request.params.id)
  var data = request.params.data
  var title = request.params.title
  if(title === undefined) title = ""
  console.log('deleting line from tab3 with data = ' + data + ' and title = ' + title)

  pool.query('DELETE FROM tab3 WHERE data = $1 AND title = $2 AND email = $3', [data, title, user_email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Line deleted`)
  })
}

const updateLineTab2 = (request, response) => {
  var old_data = request.params.data
  var old_title = request.params.title
  const { title, tag } = request.body
  if(old_title === undefined) old_title = ""
  if(title === undefined) title = ""
  console.log('updating line from data = ' + old_data + ' and title = ' + old_title)
  console.log('to new line with title = ' + title + ' and tag = ' + tag)
  pool.query(
    'UPDATE diary SET title = $1, tag = $2 WHERE data = $3 AND title = $4',[title, tag, old_data, old_title],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Line modified`)
    }
  )
}

const updateDataLineTab1 = (request, response) => {
  var user_email = request.headers['authorization']
  var old_data = request.params.data
  var old_title = request.params.title
  const {data} = request.body
  if(old_title === undefined) old_title = ""
  console.log('updating line from data = ' + old_data + ' and title = ' + old_title)
  console.log('to new line with data = ' + data)
  pool.query(
    'UPDATE tab1 SET data = $1 WHERE data = $2 AND title = $3 AND email = $4',[data, old_data, old_title, user_email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Line modified`)
    }
  )
}

const updateTitleLineTab1 = (request, response) => {
  var user_email = request.headers['authorization']
  var old_data = request.params.data
  var old_title = request.params.title
  const {title} = request.body
  if(old_title === undefined) old_title = ""
  if(title === undefined) title = ""
  console.log('updating line from data = ' + old_data + ' and title = ' + old_title)
  console.log('to new line with title = ' + title)
  pool.query(
    'UPDATE tab1 SET title = $1 WHERE data = $2 AND title = $3 AND email = $4',[title, old_data, old_title, user_email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Line modified`)
    }
  )
}

const updateLineTab3 = (request, response) => {
  var user_email = request.headers['authorization']
  var old_data = request.params.data
  var old_title = request.params.title
  const { title, data } = request.body
  if(old_title === undefined) old_title = ""
  if(title === undefined) title = ""
  console.log('updating line from data = ' + old_data + ' and title = ' + old_title)
  console.log('to new line with title = ' + title + ' and data = ' + data)
  pool.query(
    'UPDATE tab3 SET title = $1, data = $2 WHERE data = $3 AND title = $4 AND email = $5',[title, data, old_data, old_title, user_email],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Line modified`)
    }
  )
}

const loginUser = (request, response) => {
  const { name, email, password } = request.body

pool.query('SELECT email,password FROM users WHERE email = $1', [email], (error, results) => {
  if(error){
    throw error
  }
  if(results.rows[0]){
    var userData = results.rows[0]
    var pwd = bcrypt.hashSync(password,5)/*.substring(0,6)*/;
    console.log('the hashed password is ' + pwd)
    console.log('the stored hashed password is '+ userData.password/*.substring(0,6)*/)
    if(bcrypt.compareSync(password,userData.password)){
      console.log('email and password matches!')
      console.log('Logging the user in!')
      response.status(201).send('')
    }
    else{
      console.log('Login failed!')
      console.log('Wrong password!!!')
      response.status(400).send(`Wrong password!`)
    }
  }
  else{
    console.log('Login failed!')
    console.log('Wrong email!')
    response.status(400).send(`Wrong email!`)
  }
}
)
}

const registerUser = (request, response) => {
  const { name, email, password } = request.body

pool.query('SELECT id FROM users WHERE email = $1', [email], (error, results) => {
  if(error){
    throw error
  }
  if(results.rows[0]){
    console.log('User with email '+ email + ' already exist')
    response.status(400).send(`User with that EMAIL already exist`)
  }
  else{
    var pwd = bcrypt.hashSync(password,5);

    console.log('Registering user: ' + email)
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, pwd], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
  }
}
)
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}
const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}
module.exports = {
  getUsers,
  getAllDataTab2,
  getAllDataTab1,
  getAllDataTab3, 
  createLineTab2,
  createLineTab1,
  createLineTab3,
  deleteLineTab2,
  deleteLineTab1,
  deleteLineTab3,
  updateLineTab2,
  updateDataLineTab1,
  updateTitleLineTab1,
  updateLineTab3,
  loginUser,
  registerUser,

  getUserById,
  createUser,
  updateUser,
  deleteUser,
}