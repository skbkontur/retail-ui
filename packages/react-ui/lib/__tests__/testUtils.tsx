export function buildMountAttachTarget() {
  let container: HTMLDivElement | null;

  beforeEach(() => {
    container = document.createElement('div');
    container.id = 'enzymeContainer';
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    container = null;
  });
}

export function getAttachedTarget(): HTMLElement | null {
  return document.getElementById('enzymeContainer');
}
