import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import fetch from '../../lib/net/fetch-cors';

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

const CREATE_ISSUE_LINK = 'https://github.com/skbkontur/retail-ui/issues/new';
const API_URL = 'https://guides.kontur.ru/github';
const GUIDES_LINK = 'https://guides.kontur.ru/components/';

export class PathlineRenderer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issueList: [],
      isFetching: true,
      hasGuidesLink: false,
      componentExistsInGuide: false,
    };
  }

  componentDidMount = async () => {
    try {
      const component = this.getComponentName();

      await this.getIssueList(component);
      await this.checkGuideForComponent(component);
    } catch (error) {
      console.error(error);
    } finally {
      this.toggleFetchingState(false);
    }
  }

  checkGuideForComponent = async (component) => {
    const componentUrl = `${GUIDES_LINK}${component}`;

    await fetch(componentUrl).then((response) => {
      if (response.status === 200) {
        this.setState({ componentExistsInGuide: true });
      }
    });
  }

  getIssueList = (component) => {
    fetch(`${API_URL}/${component}`).then((response) => {
      return response.json();
    }).then((issueList) => {
      this.setState({
        issueList,
      });
    }).catch((error) => {
      throw error;
    });
  }

  getComponentName = () => {
    const componentPathArray = this.props.children.split(/(\\|\/)/);
    const component = componentPathArray[componentPathArray.length - 1];
    const componentName = component.split('.')[0];

    return componentName.toLowerCase();
  }

  toggleFetchingState = (isFetching) => {
    this.setState({
      isFetching,
    });
  }

  render() {
    const { classes, children } = this.props;
    const { issueList, isFetching, componentExistsInGuide } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          {children}
        </div>
        {!isFetching &&
          <div>
            {issueList.length > 0 &&
              <div>
                <h3>Список связанных issues:</h3>
                <ul>
                  {issueList.map((issue) => {
                    return <li key={issue.id}>
                      <a
                        href={issue.html_url}
                        target="_blank"
                      >{issue.title}</a>
                    </li>;
                  })}
                </ul>
              </div>
            }
            {componentExistsInGuide &&
              <h4>
                <a
                  target="_blank"
                  href={`${GUIDES_LINK}${this.getComponentName()}`}
                >Компонент в гайдах</a>
              </h4>
            }
          </div>
        }
        {isFetching &&
          <div>
            <span>loading...</span>
          </div>
        }
        <h4>
          <a
            target="_blank"
            href={CREATE_ISSUE_LINK}
          >Создать задачу</a>
        </h4>
      </div>
    );
  }
}

PathlineRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default Styled(styles)(PathlineRenderer);
