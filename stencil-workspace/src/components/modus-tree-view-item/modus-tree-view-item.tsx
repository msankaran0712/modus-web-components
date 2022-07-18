import { Component, Prop, State, h, Element, Method, Host } from '@stencil/core';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';
import TreeViewItemTunnel from '../../state-tunnel/TreeViewItem';

type TreeViewRootSettings = {
  multiSelection?: boolean;
  checkboxSelection?: boolean;
  expandIcon?: HTMLElement;
  collapseIcon?: HTMLElement;
  size?: string;
};

@Component({
  tag: 'modus-tree-view-item',
  styleUrl: 'modus-tree-view-item.scss',
  shadow: true,
})
export class ModusTreeViewItem {
  @Element() element: HTMLElement;

  /** (required) unique tree item id */
  @Prop() nodeId!: number;

  /** (required) Label for the tree item */
  @Prop() label!: string;

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) The selected state of the tree item */
  @Prop({ mutable: true }) selected: boolean;

  /** (optional) The expanded state of the tree item */
  @Prop({ mutable: true }) expanded: boolean;

  /** (optional) The size of tree item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  /** (optional) The type of tree item */
  @Prop() type: 'standard' = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  @Method()
  async setLevel(level: number): Promise<void> {
    this.level = level;
  }

  @State() expandable: boolean;

  @State() rootSettings: TreeViewRootSettings;

  @State() level = 1;

  handleItemToggle(): void {
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
  }
  handleItemClick(handler): void {
    if (this.disabled) {
      return;
    }
    if (handler) handler(this.nodeId, this.element);
    // if (this.itemClick) this.itemClick.emit();
  }

  //dirty check for updating level on children
  private hasSlotChanged = true;
  handleSlotChange(): void {
    this.hasSlotChanged = true;
  }
  componentWillRender() {
    if (this.hasSlotChanged) {
      console.log('update slot');
      if (this.element.childElementCount > 0) {
        this.expandable = true;
        Array.from(this.element.children).forEach((child) => {
          (child as HTMLModusTreeViewItemElement).setLevel(this.level + 1);
        });
      } else this.expandable = false;
      this.hasSlotChanged = false;
    }
  }

  private classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);

  render(): HTMLLIElement {
    const sizeClass = `${this.classBySize.get(this.size)}`;
    const treeItemClass = `tree-item ${this.selected ? 'selected' : ''} ${sizeClass} ${this.disabled ? 'disabled' : ''} `;
    const treeItemChildrenClass = `tree-item-group ${sizeClass} ${this.expanded ? 'expanded' : ''}`;

    return (
      <Host aria-level={this.level}>
        <TreeViewItemTunnel.Consumer>
          {({ toggleItemSelection }) => {
            return (
              <li class="tree-item-container">
                <div class={treeItemClass}>
                  <div onClick={() => this.handleItemToggle()} class="icon-slot" style={{ paddingLeft: `${(this.level - 1) * 0.5}rem ` }}>
                    {this.expandable && (this.expanded ? <IconChevronDownThick /> : <IconChevronRightThick />)}
                  </div>
                  <div
                    role="heading"
                    onClick={() => {
                      this.handleItemClick(toggleItemSelection);
                    }}>
                    <div role="button" class="slot">
                      {this.label}
                    </div>
                  </div>
                </div>
                <ul class={treeItemChildrenClass}>
                  <slot onSlotchange={() => this.handleSlotChange()} />
                </ul>
              </li>
            );
          }}
        </TreeViewItemTunnel.Consumer>
      </Host>
    );
  }
}
