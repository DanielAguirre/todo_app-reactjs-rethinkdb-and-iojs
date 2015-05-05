'use strict'

let config = {}


config.test = {
	port: process.env.PORT || 3000 ,
	rethinkdb:{
		host:'localhost',
		port:28015,
		authKey:'',
		db:'todo_test'
	},
}

config.development = {
	port: process.env.PORT || 3000 ,
	rethinkdb:{
		host:'localhost',
		port:28015,
		authKey:'',
		db:'todo'
	},
}

module.exports = config