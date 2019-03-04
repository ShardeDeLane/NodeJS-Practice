const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")

const supplierRouter = require("./routers/supplier_router.js")
const itemRouter = require("./routers/item_router.js")
const server = express()
// if the port exists it will be set by Heroku/whatever deployment engine, otherwise use port 5040
const PORT = process.env.PORT || 5040

// information about what environment we are running our app on
console.log("env", process.env)
server.use(express.json(), helmet(), logger("dev"))

// 2 resources: suppliers, items
// plug it in
// here we defined the base of this endpoint, if this is the beginning of our endpoint direct => supplierRouter
server.use("/api/suppliers", supplierRouter)

// items
// plug it in
server.use("/api/items", itemRouter)

server.get("/", (request, response) => {
  response.json({
    message: "we are live"
  })
})

server.listen(PORT, err => {
  console.log(`listening on port ${PORT}`)
})
