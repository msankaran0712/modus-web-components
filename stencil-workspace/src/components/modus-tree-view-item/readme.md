# modus-tree-view-item



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute  | Description                                    | Type                                   | Default      |
| -------------------- | ---------- | ---------------------------------------------- | -------------------------------------- | ------------ |
| `disabled`           | `disabled` | (optional) Disables the tree item              | `boolean`                              | `undefined`  |
| `expanded`           | `expanded` | (optional) The expanded state of the tree item | `boolean`                              | `undefined`  |
| `label` _(required)_ | `label`    | (required) Label for the tree item             | `string`                               | `undefined`  |
| `selected`           | `selected` | (optional) The selected state of the tree item | `boolean`                              | `undefined`  |
| `size`               | `size`     | (optional) The size of tree item               | `"condensed" \| "large" \| "standard"` | `'standard'` |
| `type`               | `type`     | (optional) The type of tree item               | `"standard"`                           | `'standard'` |


## Events

| Event               | Description                            | Type                                                     |
| ------------------- | -------------------------------------- | -------------------------------------------------------- |
| `addedTreeViewItem` |                                        | `CustomEvent<(level: number, fromNode: string) => void>` |
| `itemClick`         | An event that fires on list item click | `CustomEvent<any>`                                       |


## Methods

### `setLevel(level: number) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------


