import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ font, base, light, link, baseBackground, mq }) => ({
  root: {
    color: base,
    backgroundColor: baseBackground,
  },
  content: {
    fontFamily: font,
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});

export class PathlineRenderer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issueList: [],
    };
  }

  componentDidMount() {
    try {
      this.getIssueList();
    } catch (error) {
      console.error(error);
    }
  }

  getIssueList = () => {
    const apiUrl = 'https://api.github.com/repos/skbkontur/retail-ui/issues';
    fetch(apiUrl, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    }).then((response) => {
      return response.json();
    }).then((issueList) => {
      this.setState({
        issueList: this.filterIssue(issueList, this.getComponentName()),
      });
    }).catch((error) => {
      throw error;
    });
  }

  filterIssue = (array, componentName) => {
    return array.filter((issue) => {
      return issue.title.toLowerCase().includes(componentName.toLowerCase());
    });
  }

  getComponentName = () => {
    const componentPathArray = this.props.children.split(/(\\|\/)/);
    const component = componentPathArray[componentPathArray.length - 1];
    const componentName = component.split('.')[0];
    return componentName;
  }

  render() {
    const { classes, children } = this.props;
    const { issueList } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {children}
        </div>
        {issueList.length > 0 &&
          <div>
            <h3>Список связанных issue:</h3>
            <ul>
              {issueList.map((issue) => {
                return <li key={issue.id}>
                  <a href={issue.html_url}>{issue.title}</a>
                </li>;
              })}
            </ul>
          </div>
        }
      </div>
    );
  }
}

PathlineRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Styled(styles)(PathlineRenderer);
