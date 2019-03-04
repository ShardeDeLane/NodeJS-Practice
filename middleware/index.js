/* yarn start does nothing without this script
"scripts": {
    "start": "node index.js"
  },
*/

// create an express server
// an endpoint for GET at /
// listen
const express = require("express")
// adds a little more security to app
const helmet = require("helmet")
// morgan is a logger (gives info about our request)
const logger = require("morgan")
const customMW = require("./custom_middleware.js")
console.log("custom MW", customMW)

const server = express()
const PORT = 5050

// middleware
// 1) built in, 2) 3rd party library, 3) custom
// server.use is for plugging in middleware
server.use(express.json(), helmet(), logger("tiny"), customMW.gatekeeper)

// route handlers
server.get("/entrance", (request, response) => {
  response.json({
    message: "request received again"
  })
})

server.listen(PORT, err => {
  console.log(`server is listening on ${PORT}`)
})
