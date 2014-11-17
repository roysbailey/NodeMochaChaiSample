/**
 * Created by Roy on 04/11/2014.
 *
 * Demonstrates "simple approach" using individual tests for each scenario
 */

var expect = require('chai').expect;
var sut = require('../../../sut/NumberRangeGenerator');
var assert = require('assert');

describe.skip("NumberRangeGenerator", function(){
    describe("generating a range of 5", function() {
        var rangeArray = [];
         before(function () {
            rangeArray = sut.generateRangeArray(5);
        });

        it("should contain 5 elements - chai BDD style assert", function () {
            expect(rangeArray).to.have.length(5);
        });

        it("should contain 5 elements - old skool assert", function () {
            assert.equal(rangeArray.length, 5);
        });

        it("should contain values 0 to 4 in ascending order - chai BDD style assert", function () {
            expect([0, 1, 2, 3, 4]).to.deep.equal(rangeArray);
        });
        it("should contain values 0 to 4 in ascending order - old skool", function () {
            assert.deepEqual([0, 1, 2, 3, 4], rangeArray);
        });
    });

    describe("when doing bounds check", function() {

        it("asking for negative range, should throw an exception", function () {
            //expect(sut.generateRangeArray.bind(sut, -1)).to.throw("Maximum call stack size exceeded");
            expect(function(){sut.generateRangeArray(-1)}).to.throw("Maximum call stack size exceeded");
        });

        it("asking for a zero range, should result in a zero length array", function () {
            expect(new sut.generateRangeArray(0)).to.have.length(0);
        });
    });

});
