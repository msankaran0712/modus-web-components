import { Component, h, Listen, Prop } from '@stencil/core';

@Component({
  tag: 'modus-tree-view',
  styleUrl: 'modus-tree-view.css',
  shadow: true,
})
export class ModusTreeView {
  /** (optional) Enables multiple tree item selection */
  @Prop() multiSelection: boolean;

  /** (optional) Enables multiple tree item selection */
  @Prop() checkboxSelection: boolean;

  @Prop() expandIcon: HTMLElement;

  @Prop() collapseIcon: HTMLElement;

  /** (optional) The size of tree item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  @Listen('treeViewItemAdded')
  treeViewItemAddedHandler(e: CustomEvent): void {
    if (e.detail && e.detail.setRootSettings) {
      e.detail.setRootSettings(
        new Map<string, unknown>([
          ['multiSelection', this.multiSelection],
          ['checkboxSelection', this.checkboxSelection],
          ['expandIcon', this.expandIcon],
          ['collapseIcon', this.collapseIcon],
          ['size', this.size],
        ])
      );
    }
  }

  render(): HTMLUListElement {
    return (
      <ul>
        <slot />
      </ul>
    );
  }
}
