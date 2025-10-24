import { isReactUIInstance } from '../utils';
import { Button } from '../../components/Button';

describe('isReactUIInstance', () => {
  const button = new Button({});
  it('return true when instance is component with given name.', () => {
    expect(isReactUIInstance(button, 'Button')).toEqual(true);
  });

  it('return false when instance is not a component with given name.', () => {
    expect(isReactUIInstance(button, 'Modal')).toEqual(false);
  });
});
