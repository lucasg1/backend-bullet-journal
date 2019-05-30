const Pool = require('pg').Pool
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

const createLineTab2 = (request, response) => {
  const { data, title, tag, evento } = request.body

  pool.query('INSERT INTO diary (data, title, tag, evento) VALUES ($1, $2, $3, $4)', [data, title, tag, evento], (error, results) => {
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
  console.log('deleting line with data = ' + data + ' and title = ' + title)

  pool.query('DELETE FROM diary WHERE data = $1 AND title = $2', [data, title], (error, results) => {
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
  createLineTab2,
  deleteLineTab2,
  updateLineTab2,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}