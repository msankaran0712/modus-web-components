import { Component, Event, EventEmitter, Prop, State, h, Element, Method } from '@stencil/core';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';

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
  @Element() element: HTMLLIElement;

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

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  @State() expandable: boolean;

  @State() rootSettings: TreeViewRootSettings;

  @State() level = 1;

  @Event({
    eventName: 'treeViewItemAdded',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  onTreeViewItemAdded: EventEmitter<{ setRootSettings: (map: Map<string, unknown>) => void }>;

  setRootSettings(map: Map<string, unknown>): void {
    this.rootSettings = {
      multiSelection: map.get('multiSelection') as boolean | undefined,
      checkboxSelection: map.get('checkboxSelection') as boolean | undefined,
      expandIcon: map.get('expandIcon') as HTMLElement | undefined,
      collapseIcon: map.get('collapseIcon') as HTMLElement | undefined,
      size: map.get('size') as string | undefined,
    };
  }

  componentWillRender() {
    // update level for each child to set indentation
    if (this.element.children && this.element.children.length) {
      this.expandable = true;
      Array.from(this.element.children).forEach((child) => {
        (child as HTMLModusTreeViewItemElement).setLevel(this.level + 1);
      });
    }

    // get settings from root parent
    this.onTreeViewItemAdded.emit({ setRootSettings: this.setRootSettings });
  }

  onItemToggle(): void {
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
  }

  onItemClick(): void {
    if (this.disabled) {
      return;
    }
    this.selected = !this.selected;
    if (this.itemClick) this.itemClick.emit();
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
      <li class="tree-item-container">
        <div class={treeItemClass}>
          <div onClick={() => this.onItemToggle()} class="icon-slot" style={{ paddingLeft: `${(this.level - 1) * 0.5}rem ` }}>
            {this.expandable && (this.expanded ? <IconChevronDownThick /> : <IconChevronRightThick />)}
          </div>
          <div role="heading" onClick={this.onItemClick}>
            <div role="button" class="slot">
              {this.label}
            </div>
          </div>
        </div>
        <ul class={treeItemChildrenClass}>
          <slot />
        </ul>
      </li>
    );
  }
}
