import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';

@Component({
  tag: 'modus-tree-view-item',
  styleUrl: 'modus-tree-view-item.scss',
  shadow: true,
})
export class ModusTreeViewItem {
  /** (required) Label for the tree item */
  @Prop() label!: string;

  /** (optional) Disables the tree item */
  @Prop() disabled: boolean;

  /** (optional) The selected state of the tree item */
  @Prop() selected: boolean;

  /** (optional) The size of tree item */
  @Prop() size: 'condensed' | 'large' | 'standard' = 'standard';

  /** (optional) The type of tree item */
  @Prop() type: 'standard' = 'standard'; // Future support for 'checkbox' | 'icon' | 'menu' | 'standard' | 'switchLeft' | 'switchRight'

  /** An event that fires on list item click */
  @Event() itemClick: EventEmitter;

  @State() expanded: boolean;

  classBySize: Map<string, string> = new Map([
    ['condensed', 'small'],
    ['standard', 'standard'],
    ['large', 'large'],
  ]);
  handleExpandCollapse(): void {
    if (this.disabled) {
      return;
    }
    this.expanded = !this.expanded;
  }
  render(): HTMLLIElement {
    const sizeClass = `${this.classBySize.get(this.size)}`;
    const treeItemClass = `tree-item ${this.classBySize.get(this.size)} ${this.disabled ? 'disabled' : ''} ${this.selected ? 'selected' : ''}`;
    const treeChildrenClass = `tree-item-group ${sizeClass} ${this.expanded ? 'expanded' : ''}`;
    const iconSize = this.size === 'standard' ? '24' : '20';

    return (
      <li class="tree-item-container">
        <div class={treeItemClass} onClick={() => (!this.disabled ? this.itemClick.emit() : null)}>
          <div onClick={() => this.handleExpandCollapse()}>{this.expanded ? <IconChevronDownThick size={iconSize}></IconChevronDownThick> : <IconChevronRightThick size={iconSize}></IconChevronRightThick>}</div>
          <div role="heading">
            <div role="button" class="slot">
              {this.label}
            </div>
          </div>
        </div>
        <ul class={treeChildrenClass}>
          <slot />
        </ul>
      </li>
    );
  }
}
