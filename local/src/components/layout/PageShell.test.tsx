import { render, screen } from '@testing-library/react';

import { PageShell } from './PageShell';

describe('PageShell', () => {
  it('renders header, main content, and footer repo link', () => {
    render(
      <PageShell title="Dashboard" subtitle="Subtitle" repoUrl="https://example.com/repo">
        <div>Inner content</div>
      </PageShell>
    );

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Inner content')).toBeInTheDocument();

    const repoLink = screen.getByRole('link', { name: 'Repository' });
    expect(repoLink).toHaveAttribute('href', 'https://example.com/repo');
    expect(repoLink).toHaveAttribute('target', '_blank');
    expect(repoLink).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(repoLink).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
  });
});
