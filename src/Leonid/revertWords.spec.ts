import { revertWords } from './revertWords';
import { expect } from 'chai';

describe('revertWords function ', () => {
    it('some tests', () => {
        expect(revertWords('s1tar3t 2 hellow')).to.be.equal('t1rat3s 2 wolleh');
        expect(revertWords('s1ta$%r3t 2 hel^low')).to.be.equal('t1ra$%t3s 2 wol^leh');
        expect(revertWords('s1tar3t 2   low5')).to.be.equal('t1rat3s 2   wol5');
        expect(revertWords('мама мыла рам2у')).to.be.equal('амам алым ума2р');
    });
});