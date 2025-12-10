import type { Emotion } from '@emotion/css/create-instance';
import React from 'react';

import { useEmotion, withRenderEnvironment } from '../../lib/renderEnvironment/index.js';

const line = `
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`;

const title = `
  box-sizing: border-box;
  margin-right: 10px;
  width: 150px;
  text-align: right;
`;

const content = `
  display: inline-flex;
`;

const formLineBreak = `
  height: 20px;
`;

const actionsBar = `
  margin-top: 10px;
  padding-left: 160px;
`;

const formWrapper = `
  display: flex;
  flex-direction: column;
`;

type ComponentProps = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>;

const FormLine = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <div className={css(line, className)} {...rest}>
      {children}
    </div>
  );
};

const Line = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <div className={css(line, className)} {...rest}>
      {children}
    </div>
  );
};

const Title = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <span className={css(title, className)} {...rest}>
      {children}
    </span>
  );
};

const Content = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <span className={css(content, className)} {...rest}>
      {children}
    </span>
  );
};

const LineBreak = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <div className={css(formLineBreak, className)} {...rest}>
      {children}
    </div>
  );
};

const ActionsBar = ({ children, className, ...rest }: ComponentProps) => {
  const { css } = useEmotion();

  return (
    <div className={css(actionsBar, className)} {...rest}>
      {children}
    </div>
  );
};

@withRenderEnvironment
export class Form extends React.Component<ComponentProps> {
  public static Line = Line;
  public static LineBreak = LineBreak;
  public static ActionsBar = ActionsBar;
  public static FormLine = FormLine;
  public static Title = Title;
  public static Content = Content;

  private emotion!: Emotion;

  public render() {
    return <div className={this.emotion.css(formWrapper, this.props.className)}>{this.props.children}</div>;
  }
}
