import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../search-bar';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('renders with default value', () => {
    render(<SearchBar defaultValue="pikachu" onSearch={mockOnSearch} />);
    expect(screen.getByRole('textbox')).toHaveValue('pikachu');
  });

  it('updates input value on change', () => {
    render(<SearchBar defaultValue="" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input).toHaveValue('charizard');
  });

  it('calls onSearch with trimmed value when search button clicked', () => {
    render(<SearchBar defaultValue="  pikachu  " onSearch={mockOnSearch} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  it('calls onSearch when Enter key is pressed', () => {
    render(<SearchBar defaultValue="pikachu" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  it('does not call onSearch for other key presses', () => {
    render(<SearchBar defaultValue="pikachu" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('maintains proper tab order', () => {
    render(<SearchBar defaultValue="" onSearch={mockOnSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    expect(input).toHaveAttribute('tabIndex', '1');
    expect(button).toHaveAttribute('tabIndex', '2');
  });
});
