import { screen, render, fireEvent, act } from '@testing-library/react';
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

const postCodeElement = () => screen.getByPlaceholderText('Enter postcode');
const suburbElement = () => screen.getByPlaceholderText('Enter Suburb');

describe('a AddressForm', () => {
  beforeEach(() => {
    render(<AddressForm />);
  });

  it('validates address', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    fireEvent.change(postCodeElement(), { target: { value: 6004 } });
    fireEvent.change(suburbElement(), { target: { value: 'EAST PERTH' } });
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

  it('displays correct error when entered postcode does not match the suburb', async () => {
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    fireEvent.change(postCodeElement(), { target: { value: 6002 } });
    fireEvent.change(suburbElement(), { target: { value: 'East Perth' } });
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'WA' }
    });

    await act(() => {
      fireEvent.click(screen.getByText(/Validate/i));
    });

    expect(
      screen.getByText(
        /The postcode 6002 does not match the suburb East Perth./i
      )
    ).toBeInTheDocument();
  });

  it('displays correct error when entered suburb does not match the state', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { localities: '' },
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {}
    });

    fireEvent.change(postCodeElement(), { target: { value: 6004 } });
    fireEvent.change(suburbElement(), { target: { value: 'East Perth' } });
    fireEvent.change(screen.getByTestId('select'), {
      target: { value: 'NSW' }
    });

    await act(() => {
      fireEvent.click(screen.getByText(/Validate/i));
    });

    expect(
      screen.getByText(
        /The suburb East Perth does not exist in the state New South Wales./i
      )
    ).toBeInTheDocument();
  });
});
