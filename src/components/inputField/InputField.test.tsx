import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import InputField from './InputField';

const inputValue = 'North Sydney';

describe('a InputField', () => {
  it('renders input value passes as prop in input element ', async () => {
    const handleOnChange = jest.fn();
    render(
      <InputField
        type="text"
        name="suburb"
        value={inputValue}
        label="Postal code"
        placeholder="Enter postcode"
        onChange={handleOnChange}
      />
    );
    const element = screen.getByPlaceholderText('Enter postcode');
    expect(element).toHaveValue(inputValue);
  });
});
