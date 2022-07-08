import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import InputField from './InputField';

const inputValue = 'North Sydney';

const handleOnChange = jest.fn();

describe('a InputField', () => {
  beforeEach(() => {
    render(
      <InputField
        type="text"
        name="suburb"
        value={inputValue}
        label="Postal code"
        placeholder="Enter postcode"
        onChange={handleOnChange}
        required={true}
      />
    );
  });

  it('renders input value passes as prop in input element', async () => {
    const element = screen.getByPlaceholderText('Enter postcode');
    expect(element).toHaveValue(inputValue);
  });

  it('handles input change', async () => {
    const postCodeElement = screen.getByPlaceholderText('Enter postcode');
    fireEvent.change(postCodeElement, { target: { value: 6004 } });

    expect(handleOnChange).toHaveBeenCalledTimes(1);
  });
});
