import { FunctionalComponent, h } from '@stencil/core';
import { TreeItem, TreeViewState } from './types';
import { IconChevronDownThick } from '../icons/icon-chevron-down-thick';
import { IconChevronRightThick } from '../icons/icon-chevron-right-thick';

interface TreeItemProps extends TreeItem {
  treeState: TreeViewState;
  onItemToggle: (id: number) => void;
}

export const ModusTreeItem: FunctionalComponent<TreeItemProps> = ({ nodeId, label, children, ...rest }: TreeItemProps) => {
  const {
    onItemToggle,
    treeState: { expanded, selected },
  } = rest;
  const isExpanded = expanded && expanded.includes(nodeId);
  const isSelected = selected && selected.includes(nodeId);

  const treeItemClass = `tree-item ${isSelected ? 'selected' : ''}`;
  const treeChildrenClass = `tree-item-group ${isExpanded ? 'expanded' : ''}`;
  const iconSize = '20';
  return (
    <li class="tree-item-container">
      <div class={treeItemClass}>
        <div onClick={() => onItemToggle(nodeId)}>{isExpanded ? <IconChevronDownThick size={iconSize}></IconChevronDownThick> : <IconChevronRightThick size={iconSize}></IconChevronRightThick>}</div>
        <div role="heading">
          <div role="button" class="slot">
            {label}
          </div>
        </div>
      </div>
      <ul class={treeChildrenClass}>
        {children &&
          children.map((item) => {
            return <ModusTreeItem {...item} {...rest}></ModusTreeItem>;
          })}
      </ul>
    </li>
  );
};
