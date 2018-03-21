// @flow
import { shallow } from 'enzyme';
import DropdownMenu from '../';

describe('<DropdownMenu />', () => {
  test('Render without crashes', () => {
    const component = shallow(<DropdownMenu />);

    expect(component).toHaveLength(1);
  });
});
