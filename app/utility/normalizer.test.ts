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
        const transformedData = normalizeData(original);      
        expect(Object.keys(transformedData)).toEqual(['0','1']);
        expect(transformedData[1].parent).toEqual(0);         
    });
})