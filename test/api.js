'use strict'

const api = require('../server.js')
const host = process.env.API_TEST_HOST || api
let request = require('supertest-as-promised')

request = request(host)

describe('resource /task',function(){
    describe('POST',function(){
        it('should create a new task ', function(done){
            request.post('/todo')
                .set('Accept', 'application/json')
                .send({'row':'Leer la documentación'})
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .end(function(err,res){                    
                    console.log("body",res)
                    let body = res.body

                    expect(body).to.have.property('task')

                    let task = body.task

                    expect(task).to.have.property('row','read Documentation')
                    expect(task).to.have.property('id')
                    done()
                })
        })
    })
})
