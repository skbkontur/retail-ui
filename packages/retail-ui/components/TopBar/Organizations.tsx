import * as React from 'react';

import TopBarDropdown from './TopBarDropdown';

import styles from './TopBar.module.less';
import { Nullable } from '../../typings/utility-types';
import { ArrowChevronDownIcon } from '../internal/icons/16px';

export interface OrganizationsProps {
  caption: React.ReactNode;
  comment?: Nullable<string>;
}

export interface OrganizationsState {
  captionWhiteSpace: React.CSSProperties['whiteSpace'];
  minWidth: Nullable<number>;
}

class Organizations extends React.Component<OrganizationsProps, OrganizationsState> {
  public state = {
    captionWhiteSpace: 'normal' as React.CSSProperties['whiteSpace'],
    minWidth: null,
  };

  private _caption: Nullable<HTMLElement>;
  private _comment: Nullable<HTMLElement>;

  public componentDidMount() {
    this._recalculateWidth();
  }

  public componentDidUpdate(prevProps: OrganizationsProps) {
    if (prevProps.caption !== this.props.caption) {
      this._recalculateWidth();
    }
  }

  public render() {
    const { caption, comment } = this.props;

    const title = (
      <div>
        <span
          className={styles.organizationsTitle}
          style={{
            paddingRight: this._comment ? this._comment.offsetWidth + 30 : undefined,
          }}
        >
          <span ref={this._getCaptionRef}>{caption}</span>
          {comment && (
            <span className={styles.organizationsComment} ref={this._getCommentRef}>
              {comment}
            </span>
          )}
          <span className={styles.organizationsArrow}>
            <ArrowChevronDownIcon color="#aaa" size={14} />
          </span>
        </span>
        <div className={styles.organizationsTitleDummy} style={{ whiteSpace: this.state.captionWhiteSpace }}>
          <span>{caption}</span>
          {comment && <span className={styles.organizationsCommentDummy}>{comment}</span>}
        </div>
      </div>
    );

    return (
      <TopBarDropdown {...this.props} label={title} minWidth={this.state.minWidth}>
        {this.props.children}
      </TopBarDropdown>
    );
  }

  private _getCaptionRef = (element: HTMLSpanElement) => {
    this._caption = element;
  };

  private _getCommentRef = (element: HTMLSpanElement) => {
    this._comment = element;
  };

  private _recalculateWidth() {
    const commentWidth = this._comment ? this._comment.offsetWidth : 0;
    if (!this._caption) {
      return;
    }
    // 360 is minWidth from guides. Apply it when content is bigger.
    // 315 is because of 15px left padding and 30px arrow.
    if (this._caption.offsetWidth + commentWidth > 315) {
      this.setState({
        captionWhiteSpace: 'normal',
        minWidth: 360,
      });
    } else {
      this.setState({
        captionWhiteSpace: 'nowrap',
        minWidth: null,
      });
    }
  }
}

export default Organizations;
