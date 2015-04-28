'use strict'

const path = require('path')
const express = require('express')
const swig = require('swig')
const bodyParser = require('body-parser')

function ExpressServer(){

	this.expressServer = express()

	//middlewares

	this.expressServer.use(bodyParser.json())

	this.expressServer.engine('html',swig.renderFile)
	this.expressServer.set('view engine','html')
	this.expressServer.set('viewa',path.join(__dirname,'..','public'))

}

module.exports = ExpressServer