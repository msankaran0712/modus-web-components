import { Component, Prop, State, h } from '@stencil/core';
import { ModusTreeItem } from './modus-tree-item';
import { TreeItem, TreeViewState } from './types';

@Component({
  tag: 'modus-tree-view-pro',
  styleUrl: 'modus-tree-view-pro.scss',
  shadow: true,
})
export class ModusTreeViewPro {
  /** (required) Label for the tree item */
  @Prop() items!: TreeItem[];

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) The size of tree item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  @State() treeState: TreeViewState = { expanded: [], selected: [] };

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);

  private handleExpandCollapse(id): void {
    if (this.treeState && this.treeState.expanded) {
      const prevState = { ...this.treeState };
      const prevExpanded = prevState.expanded ? [...prevState.expanded] : [];
      if (prevExpanded.includes(id)) {
        prevState.expanded = prevExpanded.filter((item) => item !== id);
      } else {
        prevState.expanded = [id].concat(prevExpanded);
      }
      this.treeState = { ...prevState };
    } else {
      this.treeState = { expanded: [id] };
    }
  }

  render() {
    return (
      <ul class="tree-root">
        {this.items &&
          this.items.map((item) => {
            return <ModusTreeItem {...item} treeState={this.treeState} onItemToggle={(id) => this.handleExpandCollapse(id)}></ModusTreeItem>;
          })}
      </ul>
    );
  }
}
