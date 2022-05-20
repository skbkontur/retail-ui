import React from 'react';

import { Checkbox, CheckboxProps } from '../Checkbox';

interface SelectionWrapperItem {
  key: number;
  text: number;
}
interface SelectionWrapperProps {
  items: SelectionWrapperItem[];
  selectedItemsByKey: Record<string, SelectionWrapperItem>;
  onSelectedItemsUpdate: React.Dispatch<React.SetStateAction<SelectionWrapperProps['selectedItemsByKey']>>;
  renderItem: (
    item: SelectionWrapperItem,
    selected: boolean,
    onValueChange: CheckboxProps['onValueChange'],
  ) => React.ReactNode;
}
interface SelectionWrapperState {
  multipleSelection: boolean;
  multipleSelectionOriginIndex: number;
}
class SelectionWrapper extends React.Component<SelectionWrapperProps, SelectionWrapperState> {
  constructor(props: SelectionWrapperProps) {
    super(props);
    this.state = {
      multipleSelection: false,
      multipleSelectionOriginIndex: 0,
    };
    this.setMultipleSelection = this.setMultipleSelection.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.setMultipleSelection);
    document.addEventListener('keyup', this.setMultipleSelection);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.setMultipleSelection);
    document.removeEventListener('keyup', this.setMultipleSelection);
  }

  render() {
    const { items, selectedItemsByKey, renderItem } = this.props;
    return items.map((item, index) =>
      renderItem(item, !!(selectedItemsByKey && selectedItemsByKey[item.key]), (selected) =>
        this.onSelectChange(index, selected),
      ),
    );
  }

  setMultipleSelection(e: KeyboardEvent) {
    this.setState({ multipleSelection: e.shiftKey });
  }

  onSelectChange(index: number, selected: boolean) {
    const { selectedItemsByKey, multipleSelectionOriginIndex } = setItemSelected({
      items: this.props.items,
      selectedItemsByKey: this.props.selectedItemsByKey,
      index,
      selected,
      multipleSelection: this.state.multipleSelection,
      multipleSelectionOriginIndex: this.state.multipleSelectionOriginIndex,
    });
    this.setState({ multipleSelectionOriginIndex });
    this.props.onSelectedItemsUpdate(selectedItemsByKey);
  }
}

function setItemSelected(
  params: { index: number; selected: boolean } & Partial<SelectionWrapperProps> &
    Pick<SelectionWrapperProps, 'items'> &
    SelectionWrapperState,
) {
  const { items, index, selected, multipleSelection } = params;
  const selectedItemsByKey = Object.assign({}, params.selectedItemsByKey);

  const updateSelection = (i: number) => {
    const item = items[i];
    if (selected) {
      selectedItemsByKey[item.key] = item;
    } else {
      delete selectedItemsByKey[item.key];
    }
  };

  let { multipleSelectionOriginIndex } = params;
  if (multipleSelection && Object.keys(selectedItemsByKey).length > 0) {
    const diff = multipleSelectionOriginIndex - index;
    if (diff !== 0) {
      getRange(multipleSelectionOriginIndex, index).forEach(updateSelection);
      return {
        selectedItemsByKey,
        multipleSelectionOriginIndex,
      };
    }
  }

  updateSelection(index);
  multipleSelectionOriginIndex = index;

  return {
    selectedItemsByKey,
    multipleSelectionOriginIndex,
  };
}

function getRange(a: number, b: number) {
  const left = a < b ? a : b;
  const right = a > b ? a : b;
  const range = [];

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  return range;
}

export const MultipleSelection = ({ numberOfItems = 10 }) => {
  const items = Array.from({ length: numberOfItems }, (_, i) => i + 1).map((x, i) => ({
    key: i,
    text: x,
  }));
  const [selectedItems, setSelectedItems] = React.useState({});

  return (
    <SelectionWrapper
      items={items}
      selectedItemsByKey={selectedItems}
      onSelectedItemsUpdate={setSelectedItems}
      renderItem={({ key, text }, selected, onSelectChange) => {
        return (
          <div key={key}>
            <Checkbox id={`checkbox${key + 1}`} checked={selected} onValueChange={onSelectChange}>
              {text}
            </Checkbox>
          </div>
        );
      }}
    />
  );
};
