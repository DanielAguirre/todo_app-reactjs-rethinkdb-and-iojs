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
			.finally(function(){
				conn.close();
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
			.finally(function(){
				conn.close();
			})
		})
	}

	function findAll(callback){
		r.connect(config.rethinkdb)
		.then(function(conn){
			return r.table(table).run(conn)
			.error(function(err){
				console.error(err.message)
			})
			.finally(function(){
				conn.close();
			})
		})
		.then(function(cursor){ return cursor.toArray() })
		.then(function(output){	callback(output) })
	}

	function update(id, data,callback){		
		r.connect(config.rethinkdb)
		.then(function(conn){
			r.table(table).get(id).update(data,{returnChanges: true}).run(conn)
				.then(function(data){
					callback(data.changes[0].new_val)
				})
				.error(function(err){
					console.error(err.message)
				})
				.finally(function(){
					conn.close();
				})
		})
		
	}

	function remove(id,callback){
		r.connect(config.rethinkdb)
		.then(function(conn){
			r.table(table).get(id).delete().run(conn)
			.then(function(){
					callback()
				})
			.error(function(err){
				console.error(err.message)
			})
			.finally(function(){
				conn.close();
			})
		})
	}

	return {
		add:add,
		find:find,
		findAll:findAll,
		update:update,
		remove:remove
	}
}