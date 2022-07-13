import { newSpecPage } from '@stencil/core/testing';
import { ModusTreeViewItem } from './modus-tree-view-item';

describe('modus-tree-view-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTreeViewItem],
      html: '<modus-tree-view-item></modus-tree-view-item>',
    });
    expect(page.root).toEqualHtml(`
      <modus-tree-view-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-tree-view-item>
    `);
  });
});
