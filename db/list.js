'use strict'

const r = require('rethinkdb')
const table ='list'

module.exports = function(){
	function add(row, callback){
		row.createdAt = r.now()	
		r.connect(config.rethinkdb)
		.then(function(conn){
			r.table(table).insert(row, {returnChanges: true}).run(conn)
			.then(function(data){
				callback(data.changes[0].new_val)
			})
			.error(function(err){
				console.error(err.message)
			})
		})
	}

	function find(id,callback){
		r.connect(config.rethinkdb)
		.then(function(conn){
			r.table(table).get(id).run(conn)
			.then(function(data){
				callback(data)
			})
			.error(function(err){
				console.error(err.message)
			})
		})
	}

	return {
		add:add,
		find:find
	}
}