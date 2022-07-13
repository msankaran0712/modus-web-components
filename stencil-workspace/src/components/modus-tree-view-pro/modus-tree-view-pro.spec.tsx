import { newSpecPage } from '@stencil/core/testing';
import { ModusTreeViewPro } from './modus-tree-view-pro';

describe('modus-tree-view-pro', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTreeViewPro],
      html: '<modus-tree-view-pro></modus-tree-view-pro>',
    });
    expect(page.root).toEqualHtml(`
      <modus-tree-view-pro>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-tree-view-pro>
    `);
  });
});
