'use strict'

const path = require('path')
const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')
const urls = require('./urls')


function ExpressServer(){

	this.expressServer = express()

	//middlewares

	this.expressServer.use(bodyParser.json())
	this.expressServer.use(express.static(path.join(__dirname,'..','public')))
	//template Engine
	this.expressServer.engine('html',swig.renderFile)
	this.expressServer.set('view engine','html')
	this.expressServer.set('views',path.join(__dirname,'..','public'))

	this.expressServer.use('/', urls)
}

module.exports = ExpressServer