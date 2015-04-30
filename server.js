'use strict'

const http = require('http')
const expressServer = require('./expressServer')
const database = require('./db') 
const config = require('./config')
const app = new expressServer()

const server = http.createServer(app.expressServer)

const db = new database()
console.log(`${db}` 	)
db.connect()
   

server.on('listening', onListening)

server.listen(config.port)

function onListening () {
	console.log( `Server running in port ${config.port}`)
}