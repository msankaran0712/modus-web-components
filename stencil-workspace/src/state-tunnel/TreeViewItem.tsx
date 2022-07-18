import { h } from '@stencil/core';
import { createProviderConsumer } from '@stencil/state-tunnel';

export interface State {
  multiSelection?: boolean;
  checkboxSelection?: boolean;
  expandIcon?: HTMLElement;
  collapseIcon?: HTMLElement;
  size?: string;
  toggleItemSelection?: (itemNodeId: number, element: HTMLModusTreeViewItemElement) => void;
}

export default createProviderConsumer<State>({}, (subscribe, child) => <context-consumer subscribe={subscribe} renderer={child} />);
