'use strict'

const express = require('express')
const list = require('../../db/list')
const api = express.Router()
const ListModel = list()

api
    .route('/list/:id?')
    .all(function(req,res,next){
        console.log(req.method,req.path)
        res.set('Content-Type','application/json')
        next();
    })
    .post(function(req,res){ 
        ListModel.add(req.body,function(row){            
            res
                .status(201)
                .json({task:row})
        })

    })
    .get(function(req,res){
        ListModel.find(req.params.id,function(row){
            res.json({task:row})
        })
    })
    .put(function(req,res){
        ListModel.update(req.params.id, req.body,function(row){
            res.json({task:row})
        })
    })            

module.exports = api