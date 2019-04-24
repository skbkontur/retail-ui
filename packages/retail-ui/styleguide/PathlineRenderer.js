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

const ALL_ISSUES_LINK = 'https://github.com/skbkontur/retail-ui/issues';
const API_URL = 'https://guides.kontur.ru/github';
const GUIDES_LINK = 'https://guides.kontur.ru/components/';

export class PathlineRenderer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      issueList: [],
      isFetching: true,
      hasGuidesLink: false,
      componentInGuideUrl: '',
    };
  }

  componentDidMount = async () => {
    try {
      const component = this.getComponentName().toLowerCase();

      this.toggleFetchingState(true);
      await this.getIssueList(component);
      await this.getGuidesLink(component);
      this.toggleFetchingState(false);
    } catch (error) {
      console.error(error);
    }
  }

  getGuidesLink = async (component) => {
    const componentUrl = `${GUIDES_LINK}${component}`;

    await fetch(componentUrl).then((response) => {
      if (response.status === 200) {
        this.setState({ componentInGuideUrl: componentUrl });
      }
    });
  }

  getIssueList = async (component) => {
    await fetch(`${API_URL}/${component}`).then((response) => {
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

    return componentName;
  }

  toggleFetchingState = (isFetching) => {
    this.setState({
      isFetching,
    });
  }

  render() {
    const { classes, children } = this.props;
    const { issueList, isFetching, componentInGuideUrl } = this.state;

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
            {componentInGuideUrl.length > 0 &&
              <h4>
                <a
                  target="_blank"
                  href={componentInGuideUrl}
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
            href={ALL_ISSUES_LINK}
          >Список всех issues</a>
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
