import { newSpecPage } from '@stencil/core/testing';
import { ModusTreeView } from './modus-tree-view';

describe('modus-tree-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ModusTreeView],
      html: '<modus-tree-view></modus-tree-view>',
    });
    expect(page.root).toEqualHtml(`
      <modus-tree-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </modus-tree-view>
    `);
  });
});
