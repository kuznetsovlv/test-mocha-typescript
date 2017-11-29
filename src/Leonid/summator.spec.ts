import { summator } from './summator';
import { expect } from 'chai';

describe('summator function ', () => {
  it('should return 0', () => {
      expect(summator()).to.be.equal(0);
  });

  it('should return 1', () => {
      expect(summator(1)).to.be.equal(1);
  });

  it('should return 12', () => {
      expect(summator(2, 3, 7)).to.be.equal(12);
  });

  it('should return 12', () => {
      expect(summator('2', '3', '7')).to.be.equal(12);
  });
});