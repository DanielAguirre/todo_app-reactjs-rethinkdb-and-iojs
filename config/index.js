'use strict'

let config = {}

config = {
	port: process.env.PORT || 3000 ,
	rethinkdb:{
		host:'192.168.1.6',
		port:28015,
		authKey:'',
		db:'todo'
	},
}

module.exports = config