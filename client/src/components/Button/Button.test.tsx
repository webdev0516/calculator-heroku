// External Dependencies
import { mount } from 'enzyme';

// Internal Dependencies
import Button from './Button';

describe('<Button />', () => {
  it('renders button without crashing', () => {
    const mockCallBack = jest.fn();
    const button = mount(<Button name={'0'} type={true} handleClick={mockCallBack}/>);
    button.find('button').simulate('click');
    expect(mockCallBack.mock.calls[0][0]).toBe("0");
  });
});
 