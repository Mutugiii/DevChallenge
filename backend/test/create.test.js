/* eslint-disable */
const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe('Create item unit test', () => {
    it('should hit createItem endpoint', done => {
        server
            .get('/createItem')
            .expect('Content-type', /json/)
            .expect(201)
            .end(function (err, res) {
                res.status.should.equal(201);
                res.body.error.should.equal(false);
                done();
            });
    });
});