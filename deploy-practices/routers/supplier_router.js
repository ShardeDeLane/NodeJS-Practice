const express = require("express")

const router = express.Router()

// this base router.get("api/suppliers") is redundant /api/suppliers/api/suppliers, we already have a get request to handle this
// router.get("/api/suppliers", (request, response) => {
//   response.json({
//     suppliers: ["coffee roaster", "food vendor", "tea distributor"]
//   })
// })

// we can use middleware for routers too
// middleware
router.use((request, response, next) => {
  next()
})

// /api/suppliers/
router.get("/", (request, response) => {
  response.json({
    suppliers: ["coffee roaster", "food vendor", "tea distributor"]
  })
})

// /api/suppliers/
router.post("/", (request, response) => {
  const supplier = request.body
  response.status(201).json({ created: supplier })
})

// /api/suppliers/:id
router.delete("/:id", (request, response) => {
  const id = request.params.id
  response.json({ deleted: id })
})

module.exports = router
