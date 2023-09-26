import { HomePage } from '@/containers/HomePage';
import * as S from '../../@redux/store';

import { screen } from '@testing-library/react';

describe('<HomePage />', () => {
  it('should render the home correctly', () => {
    const titleHome =
      'Cuidamos bem do seu pokémon, para ele cuidar bem de você';
    S.renderWithProviders(<HomePage />);

    const textElement = screen.getByTestId('home-page-title');
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent(titleHome);
  });

  it('should render colors correctly', () => {
    const { debug } = S.renderWithProviders(<HomePage />);
    debug();

    const textElement = screen.getByTestId('home-page-title');
    expect(textElement).toHaveStyle(`font-size: 2em`);
  });
});
