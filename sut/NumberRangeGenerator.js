/**
 * Created by Roy on 04/11/2014.
 */

exports.generateRangeArray  = function(rangeSize){
    if (rangeSize < 0) {
        throw new Error("The specified range cannot be negative");
    }

    return Array.apply(null, {length: rangeSize}).map(Number.call, Number);
};

//exports.generateRangeArray  = function(elementCount){
//    if (elementCount == 5) return [0,1,2,3,4]
//    else return [0, 1, 2, 3, 4, 5, 6];
//};
