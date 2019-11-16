/* eslint-disable*/
const supertest = require('supertest');
const should = require('should');

// agent is the port where program is running
const server = supertest.agent('http://localhost:3000');

// Unit test
describe('signup unit test', () => {
    it('should hit signup endpoint', done => {
        server
            .get('/signup')
            .expect('Content-type', /json/)
            .expect(201)
            .end(function (err, res) {
                res.status.should.equal(201);
                res.body.error.should.equal(false);
                done();
            });
    });
});