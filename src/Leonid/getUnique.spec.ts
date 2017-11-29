import { getUnique, primitive } from './getUnique';
import { expect } from 'chai';

describe('getUnique function ', () => {
  it('should return [1, 2, 3, 4] ', () => {
      const result: primitive[] = getUnique(1, 1, 2, 3, 4);
      expect(result).to.deep.equal([1, 2, 3, 4]);
  });
});