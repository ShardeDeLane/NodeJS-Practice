const express = require("express")
const router = express.Router()

// /api/items
router.get("/", (request, response) => {
  response.json({
    items: ["coffee beans", "more coffee beans", "some tea", "chocolate syrup"]
  })
})

// /api/items
router.post("/", (request, response) => {
  const item = request.body
  response.status(201).json({ created: item })
})

// /api/items/:id
router.delete("/:id", (request, response) => {
  const id = request.params.id
  response.json({ deleted: id })
})

module.exports = router
