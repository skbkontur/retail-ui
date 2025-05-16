import React from 'react';
import { TrashCanIcon64Regular } from '@skbkontur/icons/TrashCanIcon64Regular';
import { TechPhoneSmartIcon64Regular } from '@skbkontur/icons/TechPhoneSmartIcon64Regular';

import { MiniModal } from '../MiniModal';
import { Button } from '../../Button';
import { Modal } from '../../Modal';
import type { Meta } from '../../../typings/stories';

export default {
  title: 'MiniModal',
  component: MiniModal,
  parameters: { creevey: { captureElement: '[data-tid="modal-content"]' } },
} as Meta;

export const Simple = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Description = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore, voluptatibus?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const TwoButtons = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Column = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer direction="column">
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const ThreeButtons = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Indent = () => (
  <MiniModal>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <MiniModal.Indent />
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Icon = () => (
  <MiniModal>
    <MiniModal.Header icon={<TrashCanIcon64Regular />}>Title</MiniModal.Header>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
    </MiniModal.Footer>
  </MiniModal>
);

export const Custom = () => (
  <MiniModal>
    <MiniModal.Header icon={null}>Delete?</MiniModal.Header>
    <Modal.Footer gap={24}>
      <Button size="medium" use="danger">
        Yes
      </Button>
      <Button size="medium">No</Button>
    </Modal.Footer>
  </MiniModal>
);

export const MobileMiniModalDefault = () => (
  <MiniModal>
    <MiniModal.Header icon={<TechPhoneSmartIcon64Regular />}>Title mobile</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <MiniModal.Indent />
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MobileMiniModalDefault.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const MobileMiniModalTop = () => (
  <MiniModal mobileAppearance={'top'}>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MobileMiniModalTop.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const MobileMiniModalCenter = () => (
  <MiniModal mobileAppearance={'center'}>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MobileMiniModalCenter.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const MobileMiniModalBottom = () => (
  <MiniModal mobileAppearance={'bottom'}>
    <MiniModal.Header>Title</MiniModal.Header>
    <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MobileMiniModalBottom.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};

export const MobileMiniModalFullscreen = () => (
  <MiniModal mobileAppearance={'fullscreen'}>
    <div style={{ margin: 'auto' }}>
      <MiniModal.Header>Title</MiniModal.Header>
      <MiniModal.Body>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum, officia?</MiniModal.Body>
    </div>
    <MiniModal.Footer>
      <Button size="medium" use="primary">
        Main
      </Button>
      <Button size="medium">Alt</Button>
      <Button size="medium">Cancel</Button>
    </MiniModal.Footer>
  </MiniModal>
);
MobileMiniModalFullscreen.parameters = {
  viewport: { defaultViewport: 'iphone' },
  creevey: { captureElement: null },
};
