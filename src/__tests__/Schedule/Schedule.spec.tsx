import SchedulePage from '@/containers/SchedulePage';
import { screen } from '@testing-library/react';
import * as S from '../../@redux/store';

describe('<HomePage />', () => {
  it('should render the About page correctly', () => {
    S.renderWithProviders(
      <SchedulePage
        listDate={[]}
        listTime={[]}
        listPokemon={[]}
        listRegion={[]}
        listCity={[]}
      />,
    );

    const textElement = screen.getByText(/Preencha o formulário abaixo/);
    expect(textElement).toBeInTheDocument();
  });
});
