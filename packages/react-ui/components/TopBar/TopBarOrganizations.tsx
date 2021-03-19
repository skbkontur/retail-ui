import React from 'react';

import { Nullable } from '../../typings/utility-types';
import { ArrowChevronDownIcon } from '../../internal/icons/16px';
import { CommonProps, CommonWrapper, CommonWrapperRestProps } from '../../internal/CommonWrapper';

import { TopBarDropdown } from './TopBarDropdown';
import { jsStyles } from './TopBar.styles';

export interface TopBarOrganizationsProps extends CommonProps {
  caption: React.ReactNode;
  comment?: Nullable<string>;
}

export interface TopBarOrganizationsState {
  captionWhiteSpace: React.CSSProperties['whiteSpace'];
  minWidth: Nullable<number>;
}
/**
 * Дропдаун с организациями
 *
 * @visibleName TopBar.OrganizationsDropdown
 */

export class TopBarOrganizations extends React.Component<TopBarOrganizationsProps, TopBarOrganizationsState> {
  public static __KONTUR_REACT_UI__ = 'TopBarOrganizations';

  public state = {
    captionWhiteSpace: 'normal' as React.CSSProperties['whiteSpace'],
    minWidth: null,
  };

  private _caption: Nullable<HTMLElement>;
  private _comment: Nullable<HTMLElement>;

  public componentDidMount() {
    this._recalculateWidth();
  }

  public componentDidUpdate(prevProps: TopBarOrganizationsProps) {
    if (prevProps.caption !== this.props.caption) {
      this._recalculateWidth();
    }
  }

  public render() {
    return <CommonWrapper {...this.props}>{this.renderMain}</CommonWrapper>;
  }

  private renderMain = (props: CommonWrapperRestProps<TopBarOrganizationsProps>) => {
    const { caption, comment, ...rest } = props;

    const title = (
      <div>
        <span
          className={jsStyles.organizationsTitle()}
          style={{
            paddingRight: this._comment ? this._comment.offsetWidth + 30 : undefined,
          }}
        >
          <span ref={this._getCaptionRef}>{caption}</span>
          {comment && (
            <span className={jsStyles.organizationsComment()} ref={this._getCommentRef}>
              {comment}
            </span>
          )}
          <span className={jsStyles.organizationsArrow()}>
            <ArrowChevronDownIcon color="#aaa" size={14} />
          </span>
        </span>
        <div className={jsStyles.organizationsTitleDummy()} style={{ whiteSpace: this.state.captionWhiteSpace }}>
          <span>{caption}</span>
          {comment && <span className={jsStyles.organizationsCommentDummy()}>{comment}</span>}
        </div>
      </div>
    );

    return (
      <TopBarDropdown {...rest} label={title} minWidth={this.state.minWidth}>
        {this.props.children}
      </TopBarDropdown>
    );
  };

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
