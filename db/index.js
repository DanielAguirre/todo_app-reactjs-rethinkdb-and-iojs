'use strict'

const r = require('rethinkdb')
let table = 'list'
let tableIndex = 'createdAt'

module.exports = function (){
	function connect(){
		r.connect(config.rethinkdb)
		 .then(function(conn){		 	
			 r.dbList().run(conn)
			  .then(function (dbList) {
				  if(dbList.indexOf(config.rethinkdb.db)>-1){
					  initialize(conn)
				  }else{
					  r.dbCreate(config.rethinkdb.db).run(conn)
					   .then(initialize(conn))
				  }
			  })
		 })
		 .error(function(err){
			 console.log(err.message)
		 })
	}
	
	function initialize(conn){
		r.table(table).indexWait(tableIndex).run(conn)
		 .then(function(result){			 
		 })
		 .error(function(error){
			 r.tableCreate(table).run(conn)
			 .finally(function (s) {
				 r.table(table).indexCreate(tableIndex).run(conn)
				  .finally(function(result){
			 			console.log('Resultado table', result)
		 			})
			 })
		 })
	}
	return {
		connect:connect
	}
}