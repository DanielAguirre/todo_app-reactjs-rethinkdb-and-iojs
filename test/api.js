'use strict'

process.env.NODE_ENV = 'test'
const api = require('../server.js')
const host = process.env.API_TEST_HOST || api
const _ = require('lodash')
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
        it('Should get a list of all tasks',function(done){
            let id
            let id2

            request.post('/api/list')
                .set('Accept', 'application/json')
                .send({'row':'read Documentation'})
                .expect('Content-Type',/application\/json/)
                .expect(201)
                .then(function(res){
                    id = res.body.task.id 

                    return  request.post('/api/list')
                                .set('Accept', 'application/json')
                                .send({'row':'Complete tutorials'})
                                .expect('Content-Type',/application\/json/)
                                .expect(201)
                }, done)
                .then(function(res){
                    id2 = res.body.task.id 

                    return  request.get('/api/list')
                                .send()
                                .expect(200)
                                .expect('Content-Type',/application\/json/)
                }, done)
                .then(function(res){
                    const body = res.body
                                        
                    expect(body).to.have.property('tasks');
                    expect(body.tasks).to.be.an('array')
                        .and.to.have.length.above(0);

                    const tasks = body.tasks
                                        
                    const task1 = _.find(tasks,{id:id})
                    const task2 = _.find(tasks,{id:id2})

                    expect(task1).to.have.property('row','read Documentation')
                    expect(task1).to.have.property('createdAt')
                    expect(task1).to.have.property('id',id);

                    expect(task2).to.have.property('row','Complete tutorials')
                    expect(task2).to.have.property('createdAt')
                    expect(task2).to.have.property('id',id2);

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

    describe('DELETE', function(){
        it('Should delete an existing task', function(done){
            let id
            request.post('/api/list')
                    .send({'row':'Completa tutorials'})
                    .expect(201)
                    .then(function(res){
                        id = res.body.task.id
                        return request.delete('/api/list/'+id)
                                    .set('Accept','application/json')
                                    .expect(204)
                    }, done)
                    .then(function(res){
                        return request.get('/api/list/'+id)
                                .expect(400)
                    }, done)
                    .then(function(res){
                        done()
                    }, done)
        })
    })
})
 