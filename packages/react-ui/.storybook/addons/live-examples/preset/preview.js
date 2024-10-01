import { CanvasAdapter, CodeAdapter } from '../components';
import storyDecorator from '../story-decorator';
export default {
  parameters: {
    docs: {
      components: {
        pre: CodeAdapter,
        Canvas: CanvasAdapter
      }
    }
  },
  decorators: [storyDecorator]
};