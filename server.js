'use strict'

const http = require('http')
const expressServer = require('./expressServer')

const app = new expressServer()
const server = http.createServer(app.expressServer)
const port = process.env.RT || 3000

server.on('listening', onListening)

server.listen(port)

function onListening () {
	console.log( `Server running in port ${port}`)
}