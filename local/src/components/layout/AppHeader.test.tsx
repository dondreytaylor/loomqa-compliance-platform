import { render, screen } from '@testing-library/react';

import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  it('renders title and subtitle', () => {
    render(<AppHeader title="My Title" subtitle="My Subtitle" />);

    expect(screen.getByRole('heading', { name: 'My Title' })).toBeInTheDocument();
    expect(screen.getByText('My Subtitle')).toBeInTheDocument();
  });
});
