import * as S from '../../@redux/store';
import { ViewUser } from '.';
import { fireEvent, screen } from '@testing-library/react';

describe('ViewUser', () => {
  it('should be true', () => {
    const { debug } = S.renderWithProviders(<ViewUser />);
    debug();
    expect(true).toBe(true);
    const textElement = screen.getByText(/Hello/i);
    expect(textElement).toBeInTheDocument();
    const buttonElement = screen.getByTestId('button-user');
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    debug();
    expect(screen.getByText(/Tony/i)).toBeInTheDocument();
  });
});
