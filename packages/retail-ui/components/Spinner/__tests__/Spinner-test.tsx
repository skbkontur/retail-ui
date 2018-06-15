import * as React from 'react';
import { mount } from 'enzyme';

import Spinner, { SpinnerConfig } from '../Spinner';
import styles from '../Spinner.less';
import { sizeMaps } from '../settings';

const render = props => mount(<Spinner {...props} />);
const generateSelector = name => `.${styles[name]}`;

describe('Spinner', () => {
  beforeEach(() => {
    SpinnerConfig.hasSvgAnimationSupport = true;
  });

  it('renders default Spinner', () => {
    render();
  });

  it('renders correct size of default Spinner', () => {
    const component = render();
    const cloudProps = component.find(generateSelector('cloud')).props();
    const { width, height } = cloudProps;
    const defaultType = Spinner.defaultProps.type;

    expect(width).toEqual(sizeMaps[defaultType].width);
    expect(height).toEqual(sizeMaps[defaultType].height);
  });

  it('renders correct default Spinner caption text', () => {
    const component = render();
    const captionText = component.find(generateSelector('captionBottom')).text();

    expect(captionText).toEqual('Загрузка');
  });

  it('prints correct caption text', () => {
    const component = render({ caption: 'test' });
    const captionText = component.find(generateSelector('captionBottom')).text();

    expect(captionText).toEqual('test');
  });

  it('should render mini Spinner', () => {
    const component = render({ type: 'mini' });
    const circle = component.find(generateSelector('circle'));
    const captionRight = component.find(generateSelector('captionRight'));

    expect(circle).toHaveLength(1);
    expect(captionRight).toHaveLength(1);
  });

  it('should render big Spinner', () => {
    const component = render({ type: 'big' });
    const cloud = component.find(generateSelector('cloud'));
    const { width, height } = cloud.props();

    expect(width).toEqual(sizeMaps.big.width);
    expect(height).toEqual(sizeMaps.big.height);
  });
});
