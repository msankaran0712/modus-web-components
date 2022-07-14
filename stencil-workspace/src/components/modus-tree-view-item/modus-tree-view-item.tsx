import { Component, Event, EventEmitter, Prop, State, h, Element, Listen } from '@stencil/core';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';

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

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  @State() expandable: boolean;

  @State() level = 1;

  @Event({
    eventName: 'addedTreeViewItem',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  addedTreeViewItem: EventEmitter<(level: number, fromNode: string) => void>;

  @Listen('addedTreeViewItem')
  treeViewItemAddedHandler(e: CustomEvent): void {
    e.cancelBubble = true;
    e.stopImmediatePropagation();
    e.preventDefault();
    e.stopPropagation();
    if (e.detail) e.detail(this.level + 1, this.label);
  }

  private classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);

  connectedCallback() {
    this.addedTreeViewItem.emit((level: number, fromNode: string) => {
      console.log(`${this.label} is set by ${fromNode}`);
      this.level = level;
    });
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
          <slot onSlotchange={() => (this.expandable = true)} />
        </ul>
      </li>
    );
  }
}
