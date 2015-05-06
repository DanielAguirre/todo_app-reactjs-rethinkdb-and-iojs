'use strict'

const express = require('express')
const list = require('../../db/list')
const api = express.Router()
const ListModel = list()


api.get('/list/', function(req,res){
        console.log("hola")
    })

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
            if(!row){
                return res
                    .status(400)
                    .send();
            }
            res.json({task:row})
        })
    })
    .put(function(req,res){
        ListModel.update(req.params.id, req.body,function(row){
            res.json({task:row})
        })
    })
    .delete(function(req,res){
        ListModel.remove(req.params.id,function(){
            res
                .status(204)
                .send();
        })
    })              

module.exports = api