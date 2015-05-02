'use strict'

let config = {}

config = {
	port: process.env.PORT || 3000 ,
	rethinkdb:{
		host:'localhost',
		port:28015,
		authKey:'',
		db:'todo'
	},
}

module.exports = config