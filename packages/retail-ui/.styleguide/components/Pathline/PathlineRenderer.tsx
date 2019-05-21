import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import Spinner from '../../../components/Spinner';
import Link from '../../../components/Link';
import Gapped from '../../../components/Gapped';
import fetch from '../../../lib/net/fetch-cors';
import OriginalPathlineRenderer from 'react-styleguidist/lib/rsg-components/Pathline/PathlineRenderer';

interface GithubIssue {
  id: string;
  html_url: string;
  title: string;
}

interface Classes {
  root: React.CSSProperties;
  issues: React.CSSProperties;
}

interface PathlineRendererProps {
  children: string;
  classes: { [name: string]: string };
}
interface PathlineRendererState {
  issueList: GithubIssue[];
  isFetching: boolean;
  hasGuidesLink: boolean;
  componentExistsInGuide: boolean;
}

const styles = ({ baseBackground, fontFamily, fontSize, color }): Classes => ({
  root: {
    color: color.base,
    backgroundColor: baseBackground,
  },
  issues: {
    height: '20px',
    marginBottom: '10px',
    outline: 'none',
  },
});

const CREATE_ISSUE_LINK = 'https://github.com/skbkontur/retail-ui/issues/new';
const API_URL = 'https://guides.kontur.ru/github';
const GUIDES_LINK = 'https://guides.kontur.ru/components/';

export class PathlineRenderer extends React.Component<PathlineRendererProps, PathlineRendererState> {
  public static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
  };
  public state: PathlineRendererState = {
    issueList: [],
    isFetching: true,
    hasGuidesLink: false,
    componentExistsInGuide: false,
  };

  public componentDidMount = async () => {
    try {
      const component = this.getComponentName();

      await this.getIssueList(component);
      await this.checkGuideForComponent(component);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isFetching: false });
    }
  };

  public checkGuideForComponent = (component: string) => {
    return fetch(`${GUIDES_LINK}${component}`).then(response =>
      this.setState({ componentExistsInGuide: response.status === 200 }),
    );
  };

  public getIssueList = (component: string) => {
    return fetch(`${API_URL}/${component}`)
      .then(response => response.json())
      .then((issueList: GithubIssue[]) => this.setState({ issueList }));
  };

  public getComponentName = () => {
    const componentPathArray = this.props.children.split(/(\\|\/)/);
    const component = componentPathArray[componentPathArray.length - 1];
    const componentName = component.split('.')[0];

    return componentName.toLowerCase();
  };

  public getCreateNewIssueLink = () => {
    let componentName = this.getComponentName();
    componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1);

    return `${CREATE_ISSUE_LINK}?title=[${componentName}]&labels=bug,${componentName}`;
  };

  public render() {
    const { classes, children } = this.props;
    const { issueList, isFetching, componentExistsInGuide } = this.state;
    const componentName = this.getComponentName();

    return (
      <div className={classes.root}>
        <OriginalPathlineRenderer>{children}</OriginalPathlineRenderer>
        <div>
          <details>
            <summary className={classes.issues}>
              {isFetching ? <Spinner type="mini" caption="Загрузка issues" /> : 'Список связанных issues:'}
            </summary>
            <ul>
              {issueList.map(issue => {
                return (
                  <li key={issue.id}>
                    <Link href={issue.html_url} target="_blank">
                      {issue.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
        <Gapped gap={20}>
          {componentExistsInGuide && (
            <Link target="_blank" href={`${GUIDES_LINK}${componentName}`}>
              Компонент в гайдах
            </Link>
          )}
          <Link target="_blank" href={this.getCreateNewIssueLink()}>
            Создать задачу
          </Link>
        </Gapped>
      </div>
    );
  }
}

export default Styled(styles)(PathlineRenderer);
