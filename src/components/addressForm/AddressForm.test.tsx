import {
  screen,
  render,
  fireEvent,
  act,
  waitFor
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import AddressForm from './AddressForm';
import localities from '../../mockData/localities.json';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedResponse = {
  data: localities,
  status: 200,
  statusText: 'Ok',
  headers: {},
  config: {}
};

describe('a AddressForm', () => {
  it('validates address', async () => {
    render(<AddressForm />);

    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    const postCodeElement = screen.getByPlaceholderText('Enter postcode');
    const suburbElement = screen.getByPlaceholderText('Enter Suburb');

    fireEvent.change(postCodeElement, { target: { value: 6004 } });
    fireEvent.change(suburbElement, { target: { value: 'EAST PERTH' } });
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'WA' }
    });

    await act(() => {
      fireEvent.click(screen.getByText(/Validate/i));
    });

    expect(
      screen.getByText(/The postcode, suburb and state entered are valid./i)
    ).toBeInTheDocument();
  });
});
