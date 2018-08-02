import * as React from 'react';
import RemoveIcon from './RemoveIcon';
import styles from './Tokens.less';
import cn from 'classnames';

interface Props<T> {
  renderValue?: (item: T) => React.ReactNode;
  selectedItems: T[];
  activeTokens: T[];
  onRemoveToken: (item: T) => void;
  onTokenClick: (event: React.MouseEvent<HTMLElement>, item: T) => void;
}

export class TokensTokens<T> extends React.Component<Props<T>> {
  render(): JSX.Element {
    const renderValue = this.props.renderValue || ((item: T) => item);

    return (
      <>
        {this.props.selectedItems.map(item => {
          const isSelected = this.props.activeTokens.indexOf(item) !== -1;
          const handleIconClick: React.MouseEventHandler<
            SVGElement
          > = event => {
            event.stopPropagation();
            this.props.onRemoveToken(item);
          };
          const handleTokenClick: React.MouseEventHandler<
            HTMLDivElement
          > = event => {
            // event.preventDefault();
            event.stopPropagation();
            this.props.onTokenClick(event, item);
          };
          return (
            <div
              key={undefined}
              onClick={handleTokenClick}
              className={cn(styles.token, { [styles.tokenActive]: isSelected })}
            >
              {renderValue(item)}
              <RemoveIcon
                className={styles.removeIcon}
                onClick={handleIconClick}
              />
            </div>
          );
        })}
      </>
    );
  }
}
