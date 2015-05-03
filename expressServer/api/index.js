'use strict'

const express = require('express')
const api = express.Router()

api
    .route('/todo/:id?')
    .all(function(req,res,next){
        console.log(req.nethod,req.path)
        res.set('Content-Type','application/json')
        next();
    })
    .post(function(req,res){        
        res
            .status(201)
            .json({})

    })
    .get(function(req,res){
            res.json([
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

module.exports = api