/* eslint-disable */
const supertest = require('supertest');
const should = require('should');

const server = supertest.agent('http://localhost:3000');

describe('GetOneItem unit test', () => {
    it('should hit getOneItem endpoint', done => {
        server
            .get('/getOneItem')
            .expect('Content-type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.status.should.equal(200);
                res.body.error.should.equal(false);
                done();
            });
    });
});