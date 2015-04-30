'use strict'

const http = require('http')
const expressServer = require('./expressServer')
const config = require('./config')
const app = new expressServer()
const server = http.createServer(app.expressServer)

server.on('listening', onListening)

server.listen(config.port)

function onListening () {
	console.log( `Server running in port ${config.port}`)
}