import React from 'react';
import PropTypes from 'prop-types';
// @ts-ignore
import Styled from 'react-styleguidist/lib/client/rsg-components/Styled';
import { Spinner } from '../../../components/Spinner';
import { Link } from '../../../components/Link';
import { Gapped } from '../../../components/Gapped';
import { Button } from '../../../components/Button';
import { fetch } from '../../../lib/net/fetch';

interface GithubIssue {
  id: string;
  html_url: string;
  title: string;
}

interface Classes {
  root: React.CSSProperties;
  issues: React.CSSProperties;
}

interface IssueListProps {
  classes: { [name: string]: string };
  componentPath: string;
}

interface IssueListState {
  issueList: GithubIssue[];
  isFetching: boolean;
  hasGuidesLink: boolean;
  componentExistsInGuide: boolean;
  issuesIsOpen: boolean;
}

const styles = ({ baseBackground, color }): Classes => ({
  root: {
    color: color.base,
    backgroundColor: baseBackground,
  },
  issues: {
    height: '20px',
    lineHeight: '1.5',
    marginBottom: '10px',
    outline: 'none',
  },
});

const CREATE_ISSUE_LINK = 'https://github.com/skbkontur/retail-ui/issues/new';
const API_URL = 'https://guides.kontur.ru/github';
const GUIDES_LINK = 'https://guides.kontur.ru/components/';

export class IssueList extends React.Component<IssueListProps, IssueListState> {
  public static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  public state: IssueListState = {
    issueList: [],
    isFetching: true,
    hasGuidesLink: false,
    componentExistsInGuide: false,
    issuesIsOpen: false,
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
    return fetch(`${GUIDES_LINK}${component.toLowerCase()}`).then(response =>
      this.setState({ componentExistsInGuide: response.status === 200 }),
    );
  };

  public getIssueList = (component: string) => {
    return fetch(`${API_URL}/${component}`)
      .then(response => response.json())
      .then((issueList: GithubIssue[]) => this.setState({ issueList }));
  };

  public getComponentName = () => {
    const componentPathArray = this.props.componentPath.split(/(\\|\/)/);
    const component = componentPathArray[componentPathArray.length - 1];
    const componentName = component.split('.')[0];

    return componentName;
  };

  public getCreateNewIssueLink = () => {
    let componentName = this.getComponentName();
    return `${CREATE_ISSUE_LINK}?title=[${componentName}]&labels=bug,${componentName}`;
  };

  private toggleIssuesVisibility = () => {
    this.setState({ issuesIsOpen: !this.state.issuesIsOpen });
  };

  private get toggleSymbol() {
    return this.state.issuesIsOpen ? '-' : '+';
  }

  private get hasIssues() {
    return this.state.issueList.length > 0;
  }

  public render() {
    const { classes } = this.props;
    const { issueList, isFetching, componentExistsInGuide, issuesIsOpen } = this.state;
    const componentName = this.getComponentName();

    return (
      <div className={classes.root}>
        <div>
          <span className={classes.issues}>
            {isFetching ? (
              <Spinner type="mini" caption="Загрузка issues" />
            ) : this.hasIssues ? (
              <Button onClick={this.toggleIssuesVisibility} use="link">
                <span>{this.toggleSymbol}</span>&nbsp; Список связанных issues:
              </Button>
            ) : (
              <span>Нет связанных issues</span>
            )}
          </span>
          <ul>
            {issuesIsOpen &&
              this.hasIssues &&
              issueList.map(issue => {
                return (
                  <li key={issue.id}>
                    <Link href={issue.html_url} target="_blank">
                      {issue.title}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <Gapped gap={20}>
          {componentExistsInGuide && (
            <Link target="_blank" href={`${GUIDES_LINK}${componentName.toLowerCase()}`}>
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

export default Styled(styles)(IssueList);
