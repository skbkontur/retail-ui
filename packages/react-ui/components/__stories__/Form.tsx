import React from 'react';
import { css } from '@skbkontur/react-ui/lib/theming/Emotion';

const line = css`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const title = css`
  box-sizing: border-box;
  margin-right: 10px;
  width: 150px;
  text-align: right;
`;

const content = css`
  display: inline-flex;
`;

const formLineBreak = css`
  height: 20px;
`;

const actionsBar = css`
  margin-top: 10px;
  padding-left: 160px;
`;

const formWrapper = css`
  display: flex;
  flex-direction: column;
`;

type ComponentProps = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

const FormLine = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <div className={css(line, className)} {...rest}>
      {children}
    </div>
  );
};

const Line = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <div className={css(line, className)} {...rest}>
      {children}
    </div>
  );
};

const Title = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <span className={css(title, className)} {...rest}>
      {children}
    </span>
  );
};

const Content = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <span className={css(content, className)} {...rest}>
      {children}
    </span>
  );
};

const LineBreak = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <div className={css(formLineBreak, className)} {...rest}>
      {children}
    </div>
  );
};

const ActionsBar = ({ children, className, ...rest }: ComponentProps) => {
  return (
    <div className={css(actionsBar, className)} {...rest}>
      {children}
    </div>
  );
};

export class Form extends React.Component<ComponentProps> {
  public static Line = Line;
  public static LineBreak = LineBreak;
  public static ActionsBar = ActionsBar;
  public static FormLine = FormLine;
  public static Title = Title;
  public static Content = Content;

  public render() {
    return <div className={css(formWrapper, this.props.className)}>{this.props.children}</div>;
  }
}
