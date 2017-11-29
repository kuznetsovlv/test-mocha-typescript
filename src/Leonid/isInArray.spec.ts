import { isInArray } from './isInArray';
import { expect } from 'chai';

describe('isInArray function ', () => {
    it('should return true ', () => {
        const result: boolean = isInArray([1, 2, 3, 4], 1);
        expect(result).to.equal(true);
    });

    it('should return false ', () => {
        const result: boolean = isInArray([1, 2, 3, 4], 8);
        expect(result).to.equal(false);
    });
});