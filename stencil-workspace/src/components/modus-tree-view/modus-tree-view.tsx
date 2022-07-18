import { Component, h, Prop, State } from '@stencil/core';
import TreeViewItemTunnel from '../../state-tunnel/TreeViewItem';

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

  @State() selected: Map<number, unknown>;

  toggleItemSelection(itemNodeId: number, element: HTMLModusTreeViewItemElement): void {
    const prevState = new Map(this.selected);

    if (prevState.has(itemNodeId)) {
      prevState.delete(itemNodeId);
      element.selected = false;
    } else {
      prevState.set(itemNodeId, element);
      element.selected = true;
    }

    this.selected = prevState;
  }

  render(): HTMLUListElement {
    const tunnelState = {
      multiSelection: this.multiSelection,
      checkboxSelection: this.checkboxSelection,
      expandIcon: this.expandIcon,
      collapseIcon: this.collapseIcon,
      selected: this.selected,
      toggleItemSelection: (itemNodeId, element) => this.toggleItemSelection(itemNodeId, element),
    };

    return (
      <ul>
        <TreeViewItemTunnel.Provider state={tunnelState}>
          <slot />
        </TreeViewItemTunnel.Provider>
      </ul>
    );
  }
}
