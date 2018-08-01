import * as React from 'react';
import DeleteIcon from './DeleteIcon';
import styles from './Tokens.less';
import cn from 'classnames';

interface Props<T> {
  renderValue?: (item: T) => React.ReactNode;
  selectedItems: T[];
  activeTokens: T[];
  onRemoveToken: (item: T) => void;
}

export class TokensTokens<T> extends React.Component<Props<T>> {
  render(): JSX.Element {
    const renderValue = this.props.renderValue || ((item: T) => item);

    return (
      <>
        {this.props.selectedItems.map(item => {
          const isSelected = this.props.activeTokens.indexOf(item) !== -1;
          const handleClick = () => this.props.onRemoveToken(item);
          return (
            <div
              key={undefined}
              className={cn(styles.token, { [styles.tokenActive]: isSelected })}
            >
              {renderValue(item)}
              <DeleteIcon className={styles.removeIcon} onClick={handleClick} />
            </div>
          );
        })}
      </>
    );
  }
}
