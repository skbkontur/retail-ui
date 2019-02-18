import RenderContainer from './components/RenderContainer';

// In general, it's easier (and performance-wise faster) to patch prototype once,
// than write "__mock__" implementation and call
// ```jest.mock(...)``` in every test (including indirect ones)

// Stable data-rendered-container-id / keys for every test
beforeAll(() => {
  // noinspection JSUnresolvedVariable
  RenderContainer.prototype.nextId = () => 1;
});
