'use strict'

const express = require('express')

const router = express.Router()

router.get('',function(req,res){
	res.render('index',{})
})

router.get('/simpleList',function(req,res){
	res
		.json([
			{
        		'row': 'Leer la documentación'
    		},
    		{
        		'row': 'Completar Tutoriales'
    		},
    		{
        		'row':'Crear un Demo'
    		},
    		{
        		'row':'Escribir sobre lo que aprendiste'
    		}
    	])
})


module.exports = router