'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var App = require('../app/app.model');
var sinon = require('sinon');

describe('GET /api/horarios', function() {
    it('should respond with JSON array', function(done) {
        var stub = sinon.stub(User, "findById");
        var userFixture = { id: 123, name: 'Obi one' };
        stub.callsArgWithAsync(1, null, userFixture);

        var stubApp = sinon.stub(App, "findById");
        var appFixture = { id: 123, name: 'Obi one' };
        stub.callsArgWithAsync(1, null, appFixture);

        request(app)
            .get('/api/horarios')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Array);
                done();
            });
    });
});
