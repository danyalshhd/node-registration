const request = require("request");
const assert = require('chai').assert;

describe('Authentication', function () {

    this.timeout(20000);
    before(function(done) { done(); });
    after(function(done) { done(); });
    beforeEach(function(done) {	done(); });
    afterEach(function(done) { done(); });

    describe('Provide No Token For User Detail', function () {
        it('responds 403', function(done){
            request.post({
                url: "http://localhost:8080/user/detail",
                body: {},
                json: true
            }, function (err, httpResponse, body) {
                assert.strictEqual(httpResponse.statusCode, 403);
                done();
            })

        });
    });


    describe('Provide Invalid Token For User Detail', function () {
        it('responds Failed to authenticate token.', function(done){
            request.post({
                url: "http://localhost:8080/user/detail",
                body: {token: "invalid"},
                json: true
            }, function (err, httpResponse, body) {
                assert.strictEqual(httpResponse.body.message, "Failed to authenticate token.");
                done();
            })

        });
    });

});