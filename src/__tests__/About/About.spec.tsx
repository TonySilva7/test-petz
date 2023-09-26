import { ABOUT } from '@/containers';
import * as S from '../../@redux/store';
import { screen } from '@testing-library/react';

describe('<HomePage />', () => {
  it('should render the About page correctly', () => {
    S.renderWithProviders(
      <ABOUT.Root>
        <ABOUT.MainTitle />
        <ABOUT.Sections />
      </ABOUT.Root>,
    );

    const textElement = screen.getByTestId('about-page-title');
    expect(textElement).toBeInTheDocument();
  });

  it('should render the last title correctly', () => {
    S.renderWithProviders(
      <ABOUT.Root>
        <ABOUT.MainTitle />
        <ABOUT.Sections />
      </ABOUT.Root>,
    );

    const textElement = screen.getByText('Alta Tecnologia');
    expect(textElement).toBeInTheDocument();
  });
});
