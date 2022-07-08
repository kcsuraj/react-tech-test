import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Alert from './Alert';

const text = 'The address is valid';

describe('an Alert', () => {
  it('renders text correctly', async () => {
    render(<Alert text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });
});
