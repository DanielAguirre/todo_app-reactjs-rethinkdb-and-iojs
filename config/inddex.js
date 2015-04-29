'use strict'

const port = process.env.PORT
let config = {}

config.dev = {
	port: port || 300 ,
	rethinkdb:{
		host:'192.168.1.6',
		port:28015
		authKey:''
		db:'test'
	} 

}

module.exports = config