import React from 'react';
import { CSFStory } from 'creevey';

import { Gapped } from '../../../components/Gapped';
import { Modal } from '../../../components/Modal';
import { Loader } from '../../../components/Loader';
import { Select } from '../../../components/Select';
import { Kebab } from '../../../components/Kebab';
import { MenuItem } from '../../../components/MenuItem';
import { Center } from '../../../components/Center';
import { Hint } from '../../../components/Hint';
import { Tooltip } from '../../../components/Tooltip';
import { ZIndex } from '../ZIndex';
import { Button } from '../../../components/Button';
import { Toggle } from '../../../components/Toggle';
import { Popup, PopupPosition } from '../../Popup';
import { Toast } from '../../../components/Toast';
import { Input } from '../../../components/Input';
import { SidePage } from '../../../components/SidePage';
import { ToastView } from '../../../components/Toast/ToastView';
import { LoaderAndButton } from '../../../components/Loader/__stories__/LoaderAndButton';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { Sticky } from '../../../components/Sticky';
import { delay } from '../../../lib/utils';

class ZKebab extends React.Component<{}> {
  public render() {
    return (
      <Kebab>
        <MenuItem>1</MenuItem>
        <MenuItem>2</MenuItem>
        <MenuItem>3</MenuItem>
        <MenuItem>4</MenuItem>
        <MenuItem>5</MenuItem>
        <MenuItem>6</MenuItem>
      </Kebab>
    );
  }
}

class ZSelect extends React.Component<{}> {
  public render() {
    return <Select value={1} items={[1, 2, 3, 4, 5, 6]} />;
  }
}

class ZLoader extends React.Component<{ size: number }> {
  public render() {
    const size = this.props.size + 'px';
    const style = { height: size, fontSize: '20px', border: 'solid red 1px' };
    return (
      <div style={{ width: size }}>
        <Loader active>
          <div style={style}>
            <Center>
              <b>
                Content
                <br />
                under
                <br />
                loader
              </b>
            </Center>
          </div>
        </Loader>
      </div>
    );
  }
}

class ZModal extends React.Component<{ size: number; children?: React.ReactNode }> {
  public render() {
    const size = this.props.size + 'px';
    return (
      <Modal>
        <Modal.Body>
          <div style={{ minWidth: size, minHeight: size }}>{this.props.children}</div>
        </Modal.Body>
      </Modal>
    );
  }
}

class LightboxUnderLightbox extends React.Component<{}> {
  public render() {
    return (
      <div>
        <ZModal size={200}>xxx</ZModal>
        <ZModal size={100}>zzz</ZModal>
      </div>
    );
  }
}

interface ZSampleProps {
  total?: number;
  current?: number;
}

interface ZSampleState {
  modal: boolean;
  popup: boolean;
}

interface InputWithTooltipProps {
  text?: string;
  pos?: PopupPosition;
}

class ZSample extends React.Component<ZSampleProps, ZSampleState> {
  public state = {
    modal: false,
    popup: false,
  };

  private popupAnchor: HTMLElement | null = null;
  private notifier: Toast | null = null;

  public render(): React.ReactNode {
    const controls = (
      <Gapped>
        <Tooltip render={() => this.renderBlock('TOOLTIP', 150)} trigger={'hover'}>
          T
        </Tooltip>
        <Hint text={this.renderBlock('HINT', 150)}>H</Hint>
        <ZSelect />
        <ZKebab />
      </Gapped>
    );
    const { total = 0, current = 0 } = this.props;
    return (
      <Gapped vertical>
        <Toast ref={e => (this.notifier = e)} />
        {controls}
        <Gapped>
          <ZLoader size={150} />
          <div ref={e => (this.popupAnchor = e)}>
            <Toggle checked={this.state.popup} onValueChange={v => this.setState({ popup: v })} />
          </div>
          {this.popupAnchor && (
            <Popup
              anchorElement={this.popupAnchor}
              positions={['left middle']}
              popupOffset={10}
              opened={this.state.popup}
              hasShadow
              hasPin
            >
              {this.renderBlock('POPUP POPUP POPUP', 300, 50)}
            </Popup>
          )}
        </Gapped>
        {controls}
        <Gapped gap={10}>
          <Button onClick={() => this.notify(current)}>TOAST</Button>
          {current < total && <Button onClick={() => this.setState({ modal: true })}>MODAL</Button>}
        </Gapped>
        {this.state.modal && (
          <Modal onClose={() => this.setState({ modal: false })}>
            <Modal.Header>M #{current}</Modal.Header>
            <Modal.Body>
              <div style={{ width: 200 * (total - current) }}>
                <ZSample total={total} current={current + 1} />
              </div>
            </Modal.Body>
          </Modal>
        )}
      </Gapped>
    );
  }

  public notify(value: number) {
    if (this.notifier) {
      this.notifier.push('Message from #' + value);
    }
  }

  public renderBlock(content: React.ReactNode, width: number, height?: number) {
    return <Center style={{ width, height: height || width }}>{content}</Center>;
  }
}

class Demo extends React.Component<{}> {
  public render() {
    return (
      <div>
        {this.renderDiv('red', 200, 0, 0)}
        {this.renderDiv('green', 100, 20, 20)}
        {
          <ZIndex delta={500} applyZIndex={false}>
            {this.renderDiv('blue', 100, 40, 40)}
          </ZIndex>
        }
        <ZIndex delta={400} applyZIndex={false}>
          <ZIndex delta={200} style={{ position: 'absolute' }}>
            {this.renderDiv('orange', 100, 40, 40)}
          </ZIndex>
        </ZIndex>
        <ZIndex delta={300} style={{ position: 'absolute' }}>
          {this.renderDiv('black', 100, 60, 60)}
        </ZIndex>
      </div>
    );
  }

  public renderDiv(background: string, zIndex: number, left: number, top: number) {
    return (
      <div
        style={{
          height: '100px',
          width: '100px',
          background,
          position: 'absolute',
          zIndex,
          left,
          top,
        }}
      />
    );
  }
}

const InputWithTooltip = ({ text = 'Hello', pos = 'top right' }: InputWithTooltipProps) => (
  <Tooltip render={() => text} trigger="opened" pos={pos}>
    <Input />
  </Tooltip>
);

const ModalWrapper = ({ caption = 'Title', ...props }: { caption?: string; children?: React.ReactChild }) => (
  <Modal>
    <Modal.Header>{caption}</Modal.Header>
    <Modal.Body>{props.children}</Modal.Body>
    <Modal.Footer panel={true} />
  </Modal>
);

class LoaderCoversTooltip extends React.Component<{}> {
  public render() {
    return (
      <div style={{ width: '500px' }}>
        <Loader type="big" active>
          <div style={{ height: 100 }} />
          <InputWithTooltip />
        </Loader>
      </div>
    );
  }
}

class ModalWithTooltipInLoader extends React.Component<{}> {
  public render() {
    return (
      <Loader type="big" active>
        <div style={{ width: '100vw', height: '100vh' }}>
          <ModalWrapper>
            <InputWithTooltip />
          </ModalWrapper>
        </div>
      </Loader>
    );
  }
}

class TooltipNearLoader extends React.Component<{}> {
  public render() {
    return (
      <div style={{ display: 'flex', width: 500, paddingBottom: 10 }}>
        <Loader type="normal" active>
          <div style={{ height: 100, width: 250 }} />
          <InputWithTooltip />
        </Loader>
        <div style={{ marginTop: 100 }}>
          <InputWithTooltip text={'World'} pos="left middle" />
        </div>
      </div>
    );
  }
}

class NestedElementsInLoader extends React.Component<{}> {
  public renderNestedModal() {
    return (
      <ModalWrapper caption="Second Modal Title">
        <InputWithTooltip text={'World'} pos="top right" />
      </ModalWrapper>
    );
  }

  public render() {
    return (
      <Loader type="big" active>
        <div style={{ width: '100vw', height: '100vh' }}>
          <ModalWrapper caption="First Modal Title">
            <div>
              <InputWithTooltip text={'World'} pos="top right" />
              {this.renderNestedModal()}
              <Button>Open modal</Button>
            </div>
          </ModalWrapper>
        </div>
      </Loader>
    );
  }
}

class HintAndModal extends React.Component<{}> {
  public state = {
    modalOpened: false,
    hintOpened: false,
  };

  public renderModal() {
    return (
      <Modal onClose={this.close}>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <div className="modalBody">
            <p>
              Use rxjs operators with react hooks. Use rxjs operators with react hooksUse rxjs operators with react
              hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
              hooksUse rxjs operators with react hooksUse rxjs operators with react hooksUse rxjs operators with react
              hooks
            </p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Button onClick={() => this.setState({ hintOpened: true })}>Show Hint</Button>
          </div>
        </Modal.Body>
        <Modal.Footer panel={true}>
          <Button onClick={this.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  public open = () => {
    this.setState({ modalOpened: true });
  };

  public close = () => {
    this.setState({ modalOpened: false });
  };

  public render() {
    return (
      <div style={{ padding: '100px' }}>
        {this.state.modalOpened && this.renderModal()}
        <Hint text="Text" opened={this.state.hintOpened} manual={true}>
          <Button onClick={this.open}>Open</Button>
        </Hint>
      </div>
    );
  }
}

class LoaderInModal extends React.Component<{}> {
  public render() {
    return (
      <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <Loader active type="big">
            Body
          </Loader>
        </Modal.Body>
        <Modal.Footer panel={true}>Footer</Modal.Footer>
      </Modal>
    );
  }
}
interface TooltipAndDropdownMenuState {
  tooltipTrigger: 'closed' | 'opened';
}

class TooltipAndSelect extends React.Component<{}> {
  public state: TooltipAndDropdownMenuState = {
    tooltipTrigger: 'closed',
  };

  public render() {
    const tooltipRender = () => (
      <div
        style={{
          width: 250,
          fontSize: 14,
          fontFamily: 'Segoe UI',
        }}
      >
        Задача организации, в особенности же рамки и место обучения кадров влечет за собой процесс внедрения и
        модернизации форм развития.
      </div>
    );

    return (
      <div className="container" style={{ height: '300px', width: '300px' }}>
        <Tooltip render={tooltipRender} pos="bottom right" trigger={this.state.tooltipTrigger}>
          <Select
            onKeyDown={() => this.setState({ tooltipTrigger: 'opened' })}
            width={120}
            value={'small'}
            items={['small', 'medium', 'large']}
            size={'small'}
          />
        </Tooltip>
      </div>
    );
  }
}

class LoaderInSidePage extends React.Component<{}> {
  public render() {
    return (
      <SidePage onClose={close} blockBackground fromLeft={true}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                      60deg,
                      #fafafa,
                      #fafafa 20px,
                      #dfdede 20px,
                      #dfdede 40px
                    )`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <ZLoader size={800} />
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button>Close</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }
}

class SidePageAndSelect extends React.Component<{}> {
  public state = {
    opened: false,
  };
  public renderSidePage() {
    return (
      <SidePage onClose={close} blockBackground fromLeft={true}>
        <SidePage.Header>Title</SidePage.Header>
        <SidePage.Body>
          <div
            style={{
              background: `repeating-linear-gradient(
                      60deg,
                      #fafafa,
                      #fafafa 20px,
                      #dfdede 20px,
                      #dfdede 40px
                    )`,
              height: 600,
              padding: '20px 0',
            }}
          >
            <SidePage.Container>
              <div className="sidepage-select-continer" style={{ display: 'flex', justifyContent: 'center' }}>
                <TooltipAndSelect />
              </div>
            </SidePage.Container>
          </div>
        </SidePage.Body>
        <SidePage.Footer panel>
          <Button onClick={this.close}>Close</Button>
        </SidePage.Footer>
      </SidePage>
    );
  }

  public open = () => {
    this.setState({ opened: true });
  };

  public close = () => {
    this.setState({ opened: false });
  };

  public render() {
    return (
      <div>
        <div className="select-container">
          <TooltipAndSelect />
        </div>
        {this.state.opened && this.renderSidePage()}
        <div className="open-sidepage-container">
          <Button onClick={this.open}>Open</Button>
        </div>
      </div>
    );
  }
}

class BigModalWithLoader extends React.Component<{}> {
  public render() {
    return (
      <Modal>
        <Modal.Header>Header</Modal.Header>
        <Modal.Body>
          <ZLoader size={800} />
          <p style={{ height: 2000 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab fuga, officia magnam dolore quas debitis tenetur
            animi iste ea sunt atque nobis velit rerum dolor voluptatibus sit? Facere, doloribus modi!
          </p>
        </Modal.Body>
        <Modal.Footer panel>
          <Button>Ок</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

function ToastAndLoader() {
  return (
    <div>
      <ToastView>Changes saved</ToastView>
      <LoaderAndButton active />
    </div>
  );
}

class ElementsInLoaderInModal extends React.Component {
  public state = { active: false };
  public render() {
    const { active } = this.state;
    return (
      <Modal>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          <Loader active={active}>
            <div style={{ padding: '100px' }}>
              <Hint text={'Test'} manual opened>
                <Gapped gap={10}>
                  <Select placeholder="Выбрать..." items={['Раз', 'Два', 'Три']} />
                  <DropdownMenu caption={<Button use="primary">Открыть меню</Button>}>
                    <MenuItem>Раз</MenuItem>
                    <MenuItem>Два</MenuItem>
                    <MenuItem>Три</MenuItem>
                  </DropdownMenu>
                </Gapped>
              </Hint>
            </div>
          </Loader>
        </Modal.Body>
        <Modal.Footer>
          <Toggle checked={active} onValueChange={this.setActive} /> Активировать
        </Modal.Footer>
      </Modal>
    );
  }

  private setActive = (active: boolean) => this.setState({ active });
}

class LoaderAndSidePage extends React.Component {
  public state = { active: false };
  public render() {
    const { active } = this.state;
    return (
      <div>
        <SidePage blockBackground>
          <SidePage.Header>Title</SidePage.Header>
          <SidePage.Body>
            <SidePage.Container>
              <p>Use rxjs operators with react hooks</p>
            </SidePage.Container>
          </SidePage.Body>
          <SidePage.Footer panel>
            <Toggle checked={active} onValueChange={this.setActive} /> Активировать
          </SidePage.Footer>
        </SidePage>
        <Loader active={active}>
          <div style={{ padding: '100px' }}>
            <Button>Open</Button>
          </div>
        </Loader>
      </div>
    );
  }
  private setActive = (active: boolean) => this.setState({ active });
}

function ModalInLoaderAndModal() {
  return (
    <div>
      <Loader active={false}>
        <Modal>
          <Modal.Header>1</Modal.Header>
          <Modal.Body>
            <p>Ехал модал через реку</p>
            <p>Видит модал в реке модал</p>
            <p>Cунул модал модал в модал</p>
            <p>Модал модал модал модал</p>
          </Modal.Body>
          <Modal.Footer>
            <Button>Close</Button>
          </Modal.Footer>
        </Modal>
      </Loader>

      <Modal>
        <Modal.Header>2</Modal.Header>
        <Modal.Body>
          Ехал модал через реку, видит модал в реке модал, сунул модал модал в модал, модал модал модал модал
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

function StickyAndLoader() {
  return (
    <>
      <Loader type="big" active>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <p>Ехал лоадер через реку</p>
            <p>Видит лоадер в реке стики</p>
            <p>Cунул лоадер лоадер в стики</p>
            <p>Стики лоадер лоадер стики</p>
            <hr />
          </div>
        ))}
        <Sticky side="bottom" offset={40}>
          <p style={{ background: '#f99' }}>I&apos;m Sticky inside Loader</p>
        </Sticky>
      </Loader>
      <Sticky side="bottom">
        <p style={{ background: '#f99' }}>Sticky outsider</p>
      </Sticky>
    </>
  );
}

function StickyAndTooltips() {
  return (
    <div style={{ width: '500px' }}>
      <div style={{ height: '120vh', position: 'relative', padding: '20px' }}>
        <div style={{ position: 'absolute', bottom: '50vh' }}>
          <Tooltip trigger="opened" pos="right top" render={() => <div style={{ lineHeight: '20vh' }}>Click me!</div>}>
            <Select placeholder="Choose..." items={['One', 'Two', 'Three']} />
          </Tooltip>
        </div>
      </div>
      <Sticky side="bottom">
        <div style={{ padding: '4vh 20px', width: '100%', background: '#e9e9e9' }}>
          <Tooltip trigger="opened" pos="right middle" render={() => "I'm inside Sticky"}>
            <Button>Close</Button>
          </Tooltip>
        </div>
      </Sticky>
    </div>
  );
}

export default { title: 'ZIndex' };

export const LightboxUnderLightboxStory = () => <LightboxUnderLightbox />;
LightboxUnderLightboxStory.story = { name: 'LightboxUnderLightbox', parameters: { creevey: { skip: [true] } } };

export const ZSampleStory = () => <ZSample total={3} />;
ZSampleStory.story = { name: 'ZSample', parameters: { creevey: { skip: [true] } } };

export const DemoStory = () => <Demo />;
DemoStory.story = { name: 'Demo', parameters: { creevey: { skip: [true] } } };

export const LoaderCoversTooltipStory = () => <LoaderCoversTooltip />;
LoaderCoversTooltipStory.story = { name: 'Loader covers tooltip' };

export const ModalWithTooltipInLoaderStory: CSFStory<JSX.Element> = () => <ModalWithTooltipInLoader />;
ModalWithTooltipInLoaderStory.story = {
  name: 'Modal With Tooltip In Loader',
  parameters: { creevey: { captureElement: null } },
};

export const NestedElementsInLoaderStory: CSFStory<JSX.Element> = () => <NestedElementsInLoader />;
NestedElementsInLoaderStory.story = {
  name: 'Nested elements in loader',
  parameters: { creevey: { captureElement: null } },
};

export const TooltipNearLoaderStory = () => <TooltipNearLoader />;
TooltipNearLoaderStory.story = { name: 'Tooltip near Loader' };

export const HintAndModalStory: CSFStory<JSX.Element> = () => <HintAndModal />;
HintAndModalStory.story = {
  name: 'Hint and modal',
  parameters: {
    creevey: {
      tests: {
        async ['Modal covers hint']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: 'button' }))
            .perform();

          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '.modalBody button' }))
            .perform();

          await this.expect(await this.browser.takeScreenshot()).to.matchImage('Modal covers hint');
        },
      },
    },
  },
};

export const LoaderInModalStory: CSFStory<JSX.Element> = () => <LoaderInModal />;
LoaderInModalStory.story = {
  name: 'Loader in Modal',
  parameters: { creevey: { captureElement: '[data-tid="modal-content"]' } },
};

export const BigModalWithLoaderStory: CSFStory<JSX.Element> = () => <BigModalWithLoader />;
BigModalWithLoaderStory.story = {
  name: 'Big modal with Loader',
  parameters: {
    creevey: {
      tests: {
        async ['Header covers Loader']() {
          await this.browser.executeScript(function() {
            const sidePage = window.document.querySelector('[data-tid="modal-container"]') as HTMLElement;

            if (sidePage) {
              sidePage.scrollTop = sidePage.offsetHeight / 3;
            }
          });

          await this.expect(await this.browser.takeScreenshot()).to.matchImage('Header covers Loader');
        },
      },
    },
  },
};

export const TooltipAndSelectStory: CSFStory<JSX.Element> = () => <TooltipAndSelect />;
TooltipAndSelectStory.story = {
  name: 'Tooltip and Select',
  parameters: {
    creevey: {
      tests: {
        async ['Menu covers tooltip']() {
          const element = await this.browser.findElement({ css: '.container' });

          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: 'button' }))
            .sendKeys('q')
            .perform();

          await this.expect(await element.takeScreenshot()).to.matchImage('Modal covers hint');
        },
      },
    },
  },
};

export const LoaderInSidePageBody: CSFStory<JSX.Element> = () => <LoaderInSidePage />;
LoaderInSidePageBody.story = {
  name: 'Loader in SidePage.Body',
  parameters: {
    creevey: {
      tests: {
        async ['is covered by Header and Footer']() {
          await this.browser.executeScript(function() {
            const sidePage = window.document.querySelector(`[data-tid='SidePage__container']`) as HTMLElement;

            if (sidePage) {
              sidePage.scrollTop = sidePage.offsetHeight;
            }
          });

          await delay(500);

          await this.expect(await this.browser.takeScreenshot()).to.matchImage('is covered by Header and Footer');
        },
      },
    },
  },
};

export const SidepageAndSelect: CSFStory<JSX.Element> = () => <SidePageAndSelect />;
SidepageAndSelect.story = {
  name: 'Sidepage and Select',
  parameters: {
    creevey: {
      tests: {
        async ['SidePage covers Select and Tooltip']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '.select-container button' }))
            .sendKeys('q')
            .perform();

          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '.open-sidepage-container button' }))
            .perform();

          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '.sidepage-select-continer button' }))
            .sendKeys('q')
            .perform();

          const element = await this.browser.findElement({ css: `[data-tid='SidePage__container']` });
          await this.expect(await element.takeScreenshot()).to.matchImage('SidePage covers Select and Tooltip');
        },
      },
    },
  },
};

export const ToastAndLoaderStory = () => <ToastAndLoader />;
ToastAndLoaderStory.story = { name: 'Toast and Loader' };

export const ElementsInLoaderInModalStory: CSFStory<JSX.Element> = () => <ElementsInLoaderInModal />;
ElementsInLoaderInModalStory.story = {
  name: 'Elements in Loader in Modal',
  parameters: {
    creevey: {
      tests: {
        async ['Open Dropdown while Loader is inactive']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
            .perform();

          await this.expect(await this.browser.takeScreenshot()).to.matchImage(
            'Open Dropdown while Loader is inactive',
          );
        },
        async ['Hide Hint on active Loader']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
            .perform();

          await delay(500);

          await this.expect(await this.browser.takeScreenshot()).to.matchImage('Hide Hint on active Loader');
        },
      },
    },
  },
};

export const LoaderAndSidePageStory: CSFStory<JSX.Element> = () => <LoaderAndSidePage />;
LoaderAndSidePageStory.story = {
  name: 'Loader and SidePage',
  parameters: {
    creevey: {
      tests: {
        async ['SidePage shadow cover Loader']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[data-comp-name~="Toggle"]' }))
            .perform();

          await this.expect(await this.browser.takeScreenshot()).to.matchImage('SidePage shadow cover Loader');
        },
      },
    },
  },
};

export const ModalInLoaderAndModalStory: CSFStory<JSX.Element> = () => <ModalInLoaderAndModal />;
ModalInLoaderAndModalStory.story = {
  name: 'Modal in Loader and Modal',
  parameters: { creevey: { captureElement: null } },
};

export const StickyAndLoaderStory: CSFStory<JSX.Element> = () => <StickyAndLoader />;
StickyAndLoaderStory.story = { name: 'Sticky and Loader', parameters: { creevey: { captureElement: null } } };

export const StickyAndTooltipsStory: CSFStory<JSX.Element> = () => <StickyAndTooltips />;
StickyAndTooltipsStory.story = {
  name: 'Sticky and Tooltips',
  parameters: {
    creevey: {
      tests: {
        async ['Sticky covers outside Popup and DropdownContainer']() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[data-comp-name~="Select"]' }))
            .perform();

          await this.expect(await this.browser.takeScreenshot()).to.matchImage(
            'Sticky covers outside Popup and DropdownContainer',
          );
        },
      },
    },
  },
};

export const ModalSidePageStack = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isSidePanelOpen, setSidePanelOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <Modal.Body>
            <div style={{ height: 300, width: 200, background: 'lightgrey' }} />
            <button onClick={() => setSidePanelOpen(true)}>Open Side Page</button>
          </Modal.Body>
        </Modal>
      )}

      {isSidePanelOpen && <SidePage onClose={() => setSidePanelOpen(false)}></SidePage>}
    </div>
  );
};
ModalSidePageStack.story = { name: 'Modal and SidePage Stack', parameters: { creevey: { skip: [true] } } };

export const ModalAndToast: CSFStory<JSX.Element> = () => {
  const toast = React.useRef<Toast>(null);
  const showNotification = () => {
    if (toast.current) {
      toast.current.push('Toast');
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <Modal>
        <Modal.Header>Modal</Modal.Header>
        <Modal.Body>
          <Button onClick={showNotification}>Show Toast</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
ModalAndToast.story = {
  parameters: {
    creevey: {
      tests: {
        async toastShown() {
          await this.browser
            .actions({ bridge: true })
            .click(this.browser.findElement({ css: '[data-comp-name~="Button"] button' }))
            .perform();

          await this.expect(await this.browser.takeScreenshot()).to.matchImage();
        },
      },
    },
  },
};
