// External Dependencies
import { mount } from 'enzyme';

// Internal Dependencies
import Display from './Display';

describe('<Display />', () => {
  it('renders Display without crashing', () => {
    const display = mount(<Display result={'100'} loading={false}/>);
    expect(display.getDOMNode().innerHTML).toEqual("100");
  });
});
 