import { expect } from 'chai';
import { eventually, page } from '../yop/lib/index.js';

describe('Home page', () => {

    beforeEach(async () => {
        await page.open('./prime.factors.web/index.html');
    });

    it('offers prime factor decomposition', async () => {
        page.set('Number to decompose').value = 42;
        page.click('compute');

        await eventually(() => {
            expect(page.section('Results')).to.contain('2 x 3 x 7');
        })
    });
});