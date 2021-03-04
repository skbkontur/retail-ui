import React from 'react';
import { CSFStory } from 'creevey';

import { Loader, LoaderProps } from '../Loader';
import { css } from '../../../lib/theming/Emotion';
import { EyeOpenedIcon } from '../../../internal/icons/16px/index';

import { LoaderAndButton } from './LoaderAndButton';

const loaderClass = css`
  height: 100%;
`;

const wrapperStyle = {
  width: '800px',
  background: 'AliceBlue',
};
class LoaderOld extends React.Component {
  public render() {
    return (
      <div>
        <Loader cloud active>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam rerum nisi error nesciunt at sunt, cum
          reprehenderit sapiente quia recusandae! Distinctio incidunt ratione a alias officiis voluptatum quae et optio.
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam placeat adipisci qui tempore ratione sed,
          impedit saepe? Non, iste soluta? Quos voluptatem temporibus rerum explicabo molestias pariatur repudiandae,
          dicta officia.
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet reprehenderit quia, facere error aspernatur
          ipsa unde amet nemo impedit totam saepe consequatur? Illo ea qui omnis incidunt laboriosam sit fugiat.
        </Loader>
      </div>
    );
  }
}

class ContentComponent extends React.Component<{
  additionalStyle?: object;
  loaderProps?: LoaderProps;
}> {
  public render() {
    const { additionalStyle, loaderProps, children } = this.props;
    return (
      <div style={{ ...wrapperStyle, ...additionalStyle }}>
        <Loader active type={'big'} {...loaderProps}>
          {children}
        </Loader>
      </div>
    );
  }
}

class NumberList extends React.Component<{
  itemsCount: number;
}> {
  public render() {
    return (
      <>
        {this.getItems(this.props.itemsCount).map(i => (
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

export const Simple = () => <Loader active />;
Simple.story = { parameters: { creevey: { skip: [true] } } };

export const TypeBig = () => (
  <ContentComponent>
    <NumberList itemsCount={10} />
  </ContentComponent>
);
TypeBig.story = { name: 'Type "big"', parameters: { creevey: { skip: [true] } } };

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
TypeBigWithText.story = { name: 'Type "big" with text', parameters: { creevey: { skip: [true] } } };

export const VerticalScroll = () => (
  <ContentComponent>
    <NumberList itemsCount={200} />
  </ContentComponent>
);
VerticalScroll.story = { name: 'Vertical scroll', parameters: { creevey: { skip: [true] } } };

export const HorizontalScroll = () => (
  <ContentComponent additionalStyle={{ width: '2500px' }}>
    <NumberList itemsCount={10} />
  </ContentComponent>
);
HorizontalScroll.story = { name: 'Horizontal scroll', parameters: { creevey: { skip: [true] } } };

export const BothDimensionsScrollableContentWithSpacesAround = () => (
  <ContentComponent additionalStyle={{ width: '2500px', margin: '600px 200px' }}>
    <NumberList itemsCount={200} />
  </ContentComponent>
);
BothDimensionsScrollableContentWithSpacesAround.story = {
  name: 'Both dimensions scrollable content with spaces around',
  parameters: { creevey: { skip: [true] } },
};

export const ActiveLoader: CSFStory<JSX.Element> = () => <LoaderAndButton active />;
ActiveLoader.story = {
  name: 'Active loader',
  parameters: {
    creevey: {
      tests: {
        async ['covers children']() {
          const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
          const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();

          await this.expect(await element.takeScreenshot()).to.matchImage('cover children');
        },
      },
    },
  },
};

export const InactiveLoader: CSFStory<JSX.Element> = () => <LoaderAndButton active={false} />;
InactiveLoader.story = {
  name: 'Inactive loader',
  parameters: {
    creevey: {
      tests: {
        async ["doesn't cover children"]() {
          const element = await this.browser.findElement({ css: '[data-comp-name~="Loader"]' });
          const button = await this.browser.findElement({ css: '[data-comp-name~="Button"]' });

          await this.browser
            .actions({ bridge: true })
            .click(button)
            .perform();

          await this.expect(await element.takeScreenshot()).to.matchImage("doesn't cover children");
        },
      },
    },
  },
};

export const WrapperWithCustomHeightAndInactiveLoader = () => (
  <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: false }}>
    <div style={{ height: '100%', backgroundColor: '#DEDEDE' }}>
      <NumberList itemsCount={10} />
    </div>
  </ContentComponent>
);
WrapperWithCustomHeightAndInactiveLoader.story = { name: 'Wrapper with custom height and inactive loader' };

export const WrapperWithCustomHeightAndActiveLoader = () => (
  <ContentComponent additionalStyle={{ height: '600px' }} loaderProps={{ className: loaderClass, active: true }}>
    <div style={{ height: '100%', backgroundColor: '#DEDEDE' }}>
      <NumberList itemsCount={10} />
    </div>
  </ContentComponent>
);
WrapperWithCustomHeightAndActiveLoader.story = { name: 'Wrapper with custom height and active loader' };

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
export const OldSpinner = () => <LoaderOld />;
OldSpinner.story = { name: 'Old spinner' };

export const WithCustomComponent: CSFStory = () => {
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
