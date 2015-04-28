'use strict'

const http = require('http')

const server = http.createServer()
const port = process.env.RT || 3000

server.on('listening', onListening)

server.listen(port)

function onListening () {
	console.log( `Server running in port ${port}`)
}