const gatekeeper = (request, response, next) => {
  const pass = request.query.pass
  if (pass === "ferret") {
    next()
  } else {
    response.status(400).json({
      message: "invalid password"
    })
  }
}

// by default module.exports is empty, but we have created a key on this for what we want to export using our gatekeeper function
// module.exports.gatekeeper = gatekeeper

const otherMW = (request, response, next) => {}

module.exports = {
  gatekeeper: gatekeeper,
  otherMW: otherMW
}
