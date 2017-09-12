import { normalizeData } from './normalizer';

describe(' Testing normalizer ', function() {
    it('Check if normalization is correct', () => {
        const original = {
            data: { name : 'first' },
            items: [
                {
                    data: { name: 'second'},                    
                }
            ] 
        }
        expect(Object.keys(normalizeData(original))).toEqual(['0','1']);
    });
})