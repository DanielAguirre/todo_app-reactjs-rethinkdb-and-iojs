'use strict'

const express = require('express')
const list = require('../../db/list')
const api = express.Router()
const ListModel = list()


api.get('/list/', function(req,res){
        ListModel.findAll(function(data){            
            res
                .set('Content-Type','application/json')
                .json({tasks:data})
        })
    })
            

api
    .route('/list/:id?')
    .all(function(req,res,next){
        res.set('Content-Type','application/json')
        next();
    })
    .post(function(req,res){
        ListModel.add(req.body,function(row){
            res
                .status(201)
                .json(row)
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