import React, { useState } from 'react';

import { AnyObject } from '../../../lib/utils';
import { Story } from '../../../typings/stories';
import { Loader, LoaderProps } from '../Loader';
import { css } from '../../../lib/theming/Emotion';
import { EyeOpenedIcon } from '../../../internal/icons/16px/index';
import { ThemeContext } from '../../../lib/theming/ThemeContext';
import { Toggle } from '../../Toggle';

import { LoaderAndButton } from './LoaderAndButton';

const loaderClass = css`
  height: 100%;
`;

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
};

const darkWrapperStyle = {
  ...wrapperStyle,
  background: '#1f1f1f',
};

interface ContentComponentProps {
  additionalStyle?: AnyObject;
  loaderProps?: Partial<LoaderProps>;
}
class ContentComponent extends React.Component<ContentComponentProps> {
  public render() {
    const { additionalStyle, loaderProps, children } = this.props;
    return (
      <ThemeContext.Consumer>
        {(theme) => {
          return (
            <div
              style={
                theme.prototype.constructor.name === 'DarkTheme'
                  ? { ...darkWrapperStyle, ...additionalStyle }
                  : { ...wrapperStyle, ...additionalStyle }
              }
            >
              <Loader active type={'big'} {...loaderProps}>
                {children}
              </Loader>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

interface NumberListProps {
  itemsCount: number;
}
class NumberList extends React.Component<NumberListProps> {
  public render() {
    return (
      <>
        {this.getItems(this.props.itemsCount).map((i) => (
          <div key={i}>{i}</div>
        ))}
      </>
    );
  }

  private getItems(count: number) {
    const items = [];
    for (let i = 0; i < count; i += 1) {
      items.push(i);
    }
    return items;
  }
}

export default { title: 'Loader' };

export const Simple = () => {
  const [toggleValue, setToggleValue] = useState(false);
  return (
    <>
      <Toggle checked={toggleValue} onValueChange={(v) => setToggleValue(v)} />
      <Loader active={toggleValue} delayBeforeSpinnerShow={2000} minimalDelayBeforeSpinnerHide={4000}>
        <div style={{ padding: '16px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </div>
      </Loader>
    </>
  );
};
Simple.parameters = { creevey: { skip: [true] } };

export const TypeBig = () => (
  <ContentComponent>
    <NumberList itemsCount={10} />
  </ContentComponent>
);
TypeBig.storyName = 'Type "big"';
TypeBig.parameters = { creevey: { skip: [true] } };

export const TypeBigWithText = () => (
  <div style={{ width: 400 }}>
    <h1>
      Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
      good vestments.&quot;
    </h1>
    <p>
      No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also Santa
      Claus! Leela, Bender, we&apos;re going grave robbing.
    </p>
    <p>
      Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
      <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
      <em>It&apos;s okay, Bender.</em> I like cooking too.
    </p>
    <h2>Oh, I think we should just stay friends.</h2>
    <p>
      No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go… look
      for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
      holding up? …To shreds, you say.
    </p>
    <ol>
      <li>No! The kind with looting and maybe starting a few fires!</li>
      <li>You are the last hope of the universe.</li>
      <li>Hey, guess what you&apos;re accessories to.</li>
    </ol>
    <Loader active type={'big'}>
      <h1>
        Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
        good vestments.&quot;
      </h1>
      <p>
        No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also Santa
        Claus! Leela, Bender, we&apos;re going grave robbing.
      </p>
      <p>
        Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
        <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
        <em>It&apos;s okay, Bender.</em> I like cooking too.
      </p>
      <h2>Oh, I think we should just stay friends.</h2>
      <p>
        No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go…
        look for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is
        his wife holding up? …To shreds, you say.
      </p>
      <ol>
        <li>No! The kind with looting and maybe starting a few fires!</li>
        <li>You are the last hope of the universe.</li>
        <li>Hey, guess what you&apos;re accessories to.</li>
      </ol>
    </Loader>
    <h1>
      Yeah, and if you were the pope they&apos;d be all, &quot;Straighten your pope hat.&quot; And &quot;Put on your
      good vestments.&quot;
    </h1>
    <p>
      No, I&apos;m Santa Claus! I guess if you want children beaten, you have to do it yourself. We&apos;re also Santa
      Claus! Leela, Bender, we&apos;re going grave robbing.
    </p>
    <p>
      Are you crazy? I can&apos;t swallow that. Large bet on myself in round one. Hey, whatcha watching?{' '}
      <strong> Moving along… I guess if you want children beaten, you have to do it yourself.</strong>
      <em>It&apos;s okay, Bender.</em> I like cooking too.
    </p>
    <h2>Oh, I think we should just stay friends.</h2>
    <p>
      No argument here. And when we woke up, we had these bodies. You guys go on without me! I&apos;m going to go… look
      for more stuff to steal! Oh, how awful. Did he at least die painlessly? …To shreds, you say. Well, how is his wife
      holding up? …To shreds, you say.
    </p>
    <ol>
      <li>No! The kind with looting and maybe starting a few fires!</li>
      <li>You are the last hope of the universe.</li>
      <li>Hey, guess what you&apos;re accessories to.</li>
    </ol>
  </div>
);
TypeBigWithText.storyName = 'Type "big" with text';
TypeBigWithText.parameters = { creevey: { skip: [true] } };

export const VerticalScroll = () => (
  <ContentComponent>
    <NumberList itemsCount={200} />
  </ContentComponent>
);
VerticalScroll.storyName = 'Vertical scroll';
VerticalScroll.parameters = { creevey: { skip: [true] } };

export const HorizontalScroll = () => (
  <ContentComponent additionalStyle={{ width: '2500px' }}>
    <NumberList itemsCount={10} />
  </ContentComponent>
);
HorizontalScroll.storyName = 'Horizontal scroll';
HorizontalScroll.parameters = { creevey: { skip: [true] } };

export const BothDimensionsScrollableContentWithSpacesAround = () => (
  <ContentComponent additionalStyle={{ width: '2500px', margin: '600px 200px' }}>
    <NumberList itemsCount={200} />
  </ContentComponent>
);
BothDimensionsScrollableContentWithSpacesAround.storyName = 'Both dimensions scrollable content with spaces around';
BothDimensionsScrollableContentWithSpacesAround.parameters = { creevey: { skip: [true] } };

export const ActiveLoader: Story = () => <LoaderAndButton active />;
ActiveLoader.storyName = 'Active loader';

ActiveLoader.parameters = {
  creevey: {
    tests: {
      async 'covers children'() {
        const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
        const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });

        await this.browser.actions({ bridge: true }).click(button).perform();

        await this.expect(await element.takeScreenshot()).to.matchImage('cover children');
      },
    },
  },
};

export const InactiveLoader: Story = () => <LoaderAndButton active={false} />;
InactiveLoader.storyName = 'Inactive loader';

InactiveLoader.parameters = {
  creevey: {
    tests: {
      async "doesn't cover children"() {
        const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
        const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });

        await this.browser.actions({ bridge: true }).click(button).perform();

        await this.expect(await element.takeScreenshot()).to.matchImage("doesn't cover children");
      },
    },
  },
};

export const WrapperWithCustomHeightAndInactiveLoader = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return (
        <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: false }}>
          <div
            style={{
              height: '100%',
              backgroundColor: theme.prototype.constructor.name === 'DarkTheme' ? '1f1f1f' : '#DEDEDE',
            }}
          >
            <NumberList itemsCount={10} />
          </div>
        </ContentComponent>
      );
    }}
  </ThemeContext.Consumer>
);
WrapperWithCustomHeightAndInactiveLoader.storyName = 'Wrapper with custom height and inactive loader';

export const WrapperWithCustomHeightAndActiveLoader = () => (
  <ThemeContext.Consumer>
    {(theme) => {
      return (
        <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: true }}>
          <div
            style={{
              height: '100%',
              backgroundColor: theme.prototype.constructor.name === 'DarkTheme' ? '1f1f1f' : '#DEDEDE',
            }}
          >
            <NumberList itemsCount={10} />
          </div>
        </ContentComponent>
      );
    }}
  </ThemeContext.Consumer>
);
WrapperWithCustomHeightAndActiveLoader.storyName = 'Wrapper with custom height and active loader';

export const ActivateLoaderAfterMountOnLargeContent = () => {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    setActive(true);
  }, []);

  return (
    <ContentComponent additionalStyle={{ height: 600, overflow: 'auto' }} loaderProps={{ active }}>
      <NumberList itemsCount={100} />
    </ContentComponent>
  );
};

export const WithCustomComponent: Story = () => {
  const getTestComponent = () => {
    return (
      <div style={{ display: 'inline-block', textAlign: 'center' }}>
        <EyeOpenedIcon color={'blue'} size={25} />
        <span style={{ display: 'block', color: 'red' }}>Загрузка</span>
      </div>
    );
  };

  const testText = 'Lorem ipsum dolor sit '.repeat(40);

  return (
    <div>
      <Loader active component={getTestComponent()}>
        {testText}
      </Loader>
      <div style={{ height: '15px' }} />
      <Loader active component={'Загрузка'}>
        {testText}
      </Loader>
      <div style={{ height: '15px' }} />
      <Loader active component={null}>
        {testText}
      </Loader>
    </div>
  );
};

export const FocusInside: Story = () => {
  const [active, setActive] = React.useState(false);
  return (
    <div>
      <Loader active={active} component={null}>
        <input style={{ margin: 10 }} />
      </Loader>
      <button onClick={() => setActive(!active)} data-tid="toggle-loader">
        toggle loader
      </button>
    </div>
  );
};
FocusInside.parameters = {
  creevey: {
    tests: {
      async 'focus inside'() {
        const loader = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
        const toggle = await this.browser.findElement({ css: '[data-tid~="toggle-loader"]' });

        await this.browser.actions().sendKeys(this.keys.TAB).perform();
        const enabled = await loader.takeScreenshot();

        await this.browser.actions().click(toggle).move({ x: 0, y: 0 }).click().perform();

        await this.browser.actions().sendKeys(this.keys.TAB).perform();
        const disabled = await loader.takeScreenshot();

        await this.expect({ enabled, disabled }).to.matchImages();
      },
    },
  },
};
