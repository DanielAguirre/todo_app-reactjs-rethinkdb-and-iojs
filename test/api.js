'use strict'

const request = require('supertest-as-promised')
const api = require('../server..js')
const host = procces.env.API_TEST_HOST || api

const request = requrest('host')

describe('resource /notas',function(){
    describe('POST',function(){
        it('should create a new task ', function(done){
            request.post('api/todo')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .end(function(err,res){
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
