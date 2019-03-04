const express = require("express")
const server = express()

const dbConfig = require("./knexfile.js")

const knex = require("knex")
// may also see dbConfig.[ENV]
const db = knex(dbConfig.development)
const PORT = 5434

// middleware
/* json body parser, necessary for any type of POST */
server.use(express.json())
// endpoints

// equivalent of an insert statement
// SQL Equivalent
// INSERT INTO crayons (color, perc_used) VALUES ('red', .9)
server.post("/crayons", (req, res) => {
  const crayon = req.body
  db("crayons")
    .insert(crayon)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to insert crayon" })
    })
})

// SQL Equivalent
// SELECT * FROM crayons
server.get("/crayons", (req, res) => {
  db("crayons")
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      err: "Failed to find crayons"
    })
})

// SQL Equivalent
// SELECT * FROM crayons WHERE id = 1 (etc)
server.get("/crayons/:id", (req, res) => {
  const { id } = req.params
  db("crayons")
    .where("id", id)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to find crayon by id" })
    })
})

// SQL Equivalent
// UPDATE crayons SET perc_used = .75 WHERE id = 1 (etc)
server.put("/crayons/:id", (req, res) => {
  const { id } = req.params
  const crayon = req.body
  db("crayons")
    .where("id", id)
    .update(crayon)
    .then(rowCount => {
      res.status(200).json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to update crayon" })
    })
})

// SQL Equivalent
// DELETE FROM crayons WHERE id = 1
server.delete("/crayons/:id", (req, res) => {
  const { id } = req.params
  db("crayons")
    .where("id", id)
    .del()
    .then(rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ err: "Failed to delete crayon" })
    })
})

// listening
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
