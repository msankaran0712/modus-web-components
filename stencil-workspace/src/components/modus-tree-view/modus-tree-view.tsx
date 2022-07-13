import { Component, h } from '@stencil/core';

@Component({
  tag: 'modus-tree-view',
  styleUrl: 'modus-tree-view.css',
  shadow: true,
})
export class ModusTreeView {
  render(): HTMLUListElement {
    return (
      <ul>
        <slot />
      </ul>
    );
  }
}
