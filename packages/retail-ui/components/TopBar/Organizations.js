
import * as React from 'react';

import Icon from '../Icon';
import TopBarDropdown from './TopBarDropdown';

import styles from './TopBar.less';

type Props = {
  caption: string | React.Element<React.ComponentType<mixed>>,
  children: React.Element<React.ComponentType<mixed>>,
  comment: ?string
};

type State = {
  captionWhiteSpace: string,
  minWidth: ?number
};

class Organizations extends React.Component<Props, State> {
  _caption: ?HTMLElement;
  _comment: ?HTMLElement;

  state = {
    captionWhiteSpace: 'normal',
    minWidth: null
  };

  componentDidMount() {
    this._recalculateWidth();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.caption !== this.props.caption) {
      this._recalculateWidth();
    }
  }

  render() {
    const { caption, comment } = this.props;

    const title = (
      <div>
        <span
          className={styles.organizationsTitle}
          style={{
            paddingRight: this._comment && this._comment.offsetWidth + 30
          }}
        >
          <span ref={this._getCaptionRef}>{caption}</span>
          {comment && (
            <span
              className={styles.organizationsComment}
              ref={this._getCommentRef}
            >
              {comment}
            </span>
          )}
          <span className={styles.organizationsArrow}>
            <Icon color="#aaa" size={14} name="ArrowChevronDown" />
          </span>
        </span>
        <div
          className={styles.organizationsTitleDummy}
          style={{ whiteSpace: this.state.captionWhiteSpace }}
        >
          <span>
            {React.isValidElement(caption)
              ? // $FlowIssue isValidElement do not provides %checks
                React.cloneElement(caption, { ref: null })
              : caption}
          </span>
          {comment && (
            <span className={styles.organizationsCommentDummy}>{comment}</span>
          )}
        </div>
      </div>
    );

    return (
      <TopBarDropdown
        {...this.props}
        caption={title}
        minWidth={this.state.minWidth}
      >
        {this.props.children}
      </TopBarDropdown>
    );
  }

  _getCaptionRef = el => {
    this._caption = el;
  };

  _getCommentRef = el => {
    this._comment = el;
  };

  _recalculateWidth() {
    const commentWidth = this._comment ? this._comment.offsetWidth : 0;
    if (!this._caption) {
      return;
    }
    // 360 is minWidth from guides. Apply it when content is bigger.
    // 315 is because of 15px left padding and 30px arrow.
    if (this._caption.offsetWidth + commentWidth > 315) {
      this.setState({
        captionWhiteSpace: 'normal',
        minWidth: 360
      });
    } else {
      this.setState({
        captionWhiteSpace: 'nowrap',
        minWidth: null
      });
    }
  }
}

export default Organizations;
