import { newE2EPage } from '@stencil/core/testing';

describe('modus-tree-view-pro', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<modus-tree-view-pro></modus-tree-view-pro>');

    const element = await page.find('modus-tree-view-pro');
    expect(element).toHaveClass('hydrated');
  });
});
