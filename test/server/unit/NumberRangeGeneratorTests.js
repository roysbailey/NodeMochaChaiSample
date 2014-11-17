/**
 * Created by Roy on 04/11/2014.
 *
 * Demonstrates a "data driven" testing approach.  So we can have the same "test logic"
 * but executed for a variety of inputs without having to duplicate test code.
 */

var expect = require('chai').expect;
var sut = require('../../../sut/NumberRangeGenerator');
var assert = require('assert');

describe("NumberRangeGenerator", function () {
    describe("ranges within a sensible range", function () {
        // Test input data
        var calculateRangeTestInputs = [
            {
                rangeSize: 5,
                it_lengthTestName: "a range of 5, result should contain 5 elements",
                it_contentTestName: "a range of 5, result should contain values 0 to 4 in ascending order"
            },
            {
                rangeSize: 7,
                it_lengthTestName: "a range of 7, result should contain 7 elements",
                it_contentTestName: "a range of 7, result should contain values 0 to 6 in ascending order"
            },
            {
                rangeSize: 10,
                it_lengthTestName: "a range of 10, result should contain 10 elements",
                it_contentTestName: "a range of 10, result should contain values 0 to 9 in ascending order"
            },
            {
                rangeSize: 34,
                it_lengthTestName: "a range of 34, result should contain 34 elements",
                it_contentTestName: "a range of 34, result should contain values 0 to 33 in ascending order"
            },
            {
                rangeSize: 100,
                it_lengthTestName: "a range of 100, result should contain 100 elements",
                it_contentTestName: "a range of 100, result should contain values 0 to 99 in ascending order"
            }
        ];

        // test function to check length of created array is as expected (done in a closure - returned function)
        var testArrayLengthAsExpected = function (rangeSizeInput) {
            return function () {
                var rangeArray = sut.generateRangeArray(rangeSizeInput);
                expect(rangeArray).to.have.length(rangeSizeInput);
            };
        };

        // test function to check that the content of the created array is as expected (done in a closure - returned function)
        var testArrayContentAsExpected = function (rangeSizeInput) {
            return function () {
                var rangeArray = sut.generateRangeArray(rangeSizeInput);
                var expectedArray = generateExpectedArray(rangeSizeInput);
                expect(expectedArray).to.deep.equal(rangeArray);
            };
        };

        // Create a mocha it() test, to call the “test function” for each input.
        calculateRangeTestInputs.forEach(function (calculateRangeTestInput) {
            it(calculateRangeTestInput.it_lengthTestName, testArrayLengthAsExpected(calculateRangeTestInput.rangeSize));
            it(calculateRangeTestInput.it_contentTestName, testArrayContentAsExpected(calculateRangeTestInput.rangeSize));
        });

        function generateExpectedArray(rangeSize) {
            var expectedArray = [];
            for (var i = 0; i < rangeSize; i++) {
                expectedArray.push(i);
            }
            return expectedArray;
        }
    });

    describe("when checking the bounds of range requests", function () {
        it("asking for negative range, should throw an exception", function () {
            expect(sut.generateRangeArray.bind(sut, -1)).to.throw("The specified range cannot be negative");
        });

        it("asking for a zero range, should result in a zero length array", function () {
            expect(new sut.generateRangeArray(0)).to.have.length(0);
        });

        it("asking for a large number, should result in the correct output", function () {
            expect(new sut.generateRangeArray(0)).to.have.length(0);
        });

        it("asking for a large range of 10000 should result in an array of the correct size", function () {
            var largeRange = 10000;
            var rangeArray = sut.generateRangeArray(largeRange);
            expect(rangeArray).to.have.length(largeRange);
        });

    });
});


