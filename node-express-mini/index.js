// implement your API here
const express = require("express")
const db = require("./data/db")

const server = express()
const parser = express.json()
const PORT = 4000

// parses the body data
server.use(parser)

// setting up API Practice
// const express = require("express")
// const db = "./data/db"

// const server = express()
// const parser = express.json()
// server.use(parser)
// const PORT = 4000

// get method practice

// server.get("/api/users", (request, response) => {
//   db.find().then(users => {
//     response.status(200).json(users)
//   }).catch(error => {
//     response.status(400).json({
//       message: "unable to retrieve users from database"
//     })
//   })
// })\\\\\\0

// server.get("/api/users/:id", (request, response) => {
//   const { id } = request.params
//   db.findById(id).then(user => {
//     if(user) {
//       response.status(200).json(user)
//     } else {
//       response.status(404).json({
//         message: "user does not exist"
//       })
//     }
//   }).catch(error => {
//     message: "unable to retrieve user by id"
//   })
// })

// post method practice

// server.post('/', (request, response) => {
//   const user = request.body
//   console.log("user", user)
//   if(user.name && user.bio) {
//     db.insert(user)
//     .then(idInfo => {
//       db.findById(idInfo.id)
//       .then(user => {
//         response.status(201).json(user)
//       })
//     }).catch(error => {
//       response.status(500).json({
//         message: "failed to insert user in database"
//       })
//     })
//   } else {
//     response.status(400).json({
//       message: "missing name or bio"
//     })
//   }
// })

// delete method practice

// server.delete('/api/users/:id', (request, response) => {
//  const { id } = request.params
//  console.log("user id", id)
//  db.remove(id).then(count => {
//   if(count) {
//     response.status(200).json({
//       message: "user successfully deleted"
//     })
//   } else {
//     response.status(404).json({
//       message: "invalid id"
//     })
//   }
//  }).catch(error => {
//    response.status(500).json({
//      message: "failed to delete user"
//    })
//  })
// })

// put method practice (update)

// server.put("/", (request, response) => {
//   const { id } = request.params
//   const user = request.body
//   if(user.name && user.bio) {
//     db.update(id, user).then(count => {
//       if(count){
//         db.findById(id).then(user => {
//           response.status(200).json(user)
//         })
//       } else {
//         response.status(404).json({
//           message: "invalid id"
//         })
//       }
//     }).catch()
//   } else {
//     response.status(500).json({
//       message: "failed to update user info"
//     })
//   }
// })

// get methods
// endpoints
server.get("/api/users", (request, response) => {
  db.find()
    .then(users => {
      response.json(users)
    })
    .catch(error => {
      response.status(500).json({
        message: "unable to retrieve the list of users"
      })
    })
})

server.get("/api/users/:id", (request, response) => {
  const { id } = request.params
  db.findById(id)
    .then(user => {
      if (user) {
        response.status(200).json(user)
      } else {
        response.status(404).json({
          message: "user does not exist"
        })
      }
    })
    .catch(error => {
      response.status(500).json({
        message: "unable to retrieve by id"
      })
    })
})

// post method to send data
// status 201 states something has been created in database
server.post("/api/users", (request, response) => {
  const user = request.body
  console.log("user from body", user)
  if (user.name && user.bio) {
    db.insert(user)
      .then(idInfo => {
        console.log("user id info", idInfo)
        db.findById(idInfo.id).then(user => {
          response.status(201).json(user)
        })
      })
      .catch(error => {
        response.status(500).json({
          message: "failed to insert user in database"
        })
      })
  } else {
    response.status(400).json({
      message: "missing name or bio"
    })
  }
})

// delete method to delete users by id
server.delete("/api/users/:id", (request, response) => {
  const { id } = request.params
  console.log("id", id)
  db.remove(id)
    .then(count => {
      if (count) {
        // we would like to send back the user
        // not ideal
        response.json({ message: "successfully deleted" })
      } else {
        response.status(404).json({
          message: "invalid id"
        })
      }
    })
    .catch(error => {
      response.status(500).json({
        message: "failed to delete user"
      })
    })
})

// put method
server.put("/api/users/:id", (request, response) => {
  const user = request.body
  const { id } = request.params

  if (user.name && user.bio) {
    db.update(id, user)
      .then(count => {
        // 200 successfully updated(send back our updated user)
        if (count) {
          db.findById(id).then(user => {
            response.json(user)
          })

          // 404 invalid id
        } else {
          response.status(404).json({
            message: "invalid id"
          })
        }
      })
      .catch(error => {
        // 500 something else went wrong
        response.status(500).json({
          message: "failed to update user"
        })
      })
  } else {
    // 400 name or bio is missing
    response.status(400).json({ message: "missing name or bio" })
  }
})

// queries
server.get("/search", (request, response) => {
  console.log("query", request.query)
  // endpoint?
  // key value pairs separated by & num=30 source=hp
  // localhost:4000/search?keyword=ferrets&num=10
  response.send(`searching for ${request.query.num} ${request.query.keyword}`)
})

// listening
server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`)
})
