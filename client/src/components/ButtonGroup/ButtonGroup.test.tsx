// External Dependencies
import { render } from '@testing-library/react';

// Internal Dependencies
import ButtonGroup from './ButtonGroup';

describe('<ButtonGroup />', () => {
  it('renders buttongroup without crashing', () => {
    render(<ButtonGroup handleClick={() => {}}/>);
  });
});
 