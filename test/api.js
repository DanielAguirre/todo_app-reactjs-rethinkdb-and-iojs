'use strict'

process.env.NODE_ENV = 'test'
const api = require('../server.js')
const host = process.env.API_TEST_HOST || api
let request = require('supertest-as-promised')

request = request(host)

describe('resource /task',function(){
    describe('POST',function(){
        it('should create a new task ', function(done){
            request.post('/api/list')
                .set('Accept', 'application/json')
                .send({'row':'read Documentation'})
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .end(function(err,res){
                    let body = res.body

                    expect(body).to.have.property('task')

                    let task = body.task

                    expect(task).to.have.property('row','read Documentation')
                    expect(task).to.have.property('createdAt')
                    expect(task).to.have.property('id')
                    done()
                })
        })
    })

    describe('GET', function(){
        it('Should get an existing task',function(done){
            let id;
            request.post('/api/list')
                .set('Accept', 'application/json')
                .send({'row':'Completa tutorials'})
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .then(function(res){
                    id = res.body.task.id
                    return request
                            .get('/api/list/'+id)
                            .expect(200)
                            .expect('Content-Type',/application\/json/)
                },done)
                .then(function(res){
                    const task = res.body.task

                    expect(task).to.have.property('row','Completa tutorials')
                    expect(task).to.have.property('createdAt')
                    expect(task).to.have.property('id',id)
                    done()
                }, done)

        })
    })

    describe('PUT',function(){
        it('Should update an existing task',function(done){
            let id ;
            request.post('/api/list')
                .set('Accept', 'application/json')
                .send({'row':'Completa tutorials'})
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .then(function(res){
                    id = res.body.task.id
                    return request
                            .get('/api/list/'+id)
                            .set('Accept', 'application/json')
                            .send()
                }, done)
                .then(function(res){
                    const task = res.body.task
                    task.row = "Finish Tutorials"

                    return request
                                .put('/api/list/'+id)
                                .send(task)
                                .expect(200)
                                .expect('Content-Type',/application\/json/)
                }, done)
                .then(function(res){
                    const task = res.body.task

                    expect(task).to.have.property('row','Finish Tutorials')
                    expect(task).to.have.property('createdAt')
                    expect(task).to.have.property('id',id)
                    done()
                }, done)
        })
    })
})
 