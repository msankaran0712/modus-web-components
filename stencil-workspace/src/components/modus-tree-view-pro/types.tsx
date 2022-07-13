export type TreeItem = {
  nodeId: number;
  label: string | HTMLElement;
  children?: TreeItem[];
};

export type TreeViewState = {
  expanded?: number[];
  selected?: number[];
};
