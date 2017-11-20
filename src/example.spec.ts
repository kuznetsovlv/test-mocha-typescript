import { isInArray } from './example';
import { expect } from 'chai';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';
describe('isInArray function', () => {
    it('should return false if isInArray([1,2,3],3,4,5)', () => {
        const result = isInArray([1, 2, 3], 3, 4, 5);
        expect(result).to.equal(false);
    });
    it('should return true if isInArray([1,2,3],2,1,3)', () => {
        const result = isInArray([1, 2, 3], 2, 1, 3);
        expect(result).to.equal(true);
    });
});