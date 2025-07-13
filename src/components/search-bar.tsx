import { Component, type ChangeEvent, type KeyboardEvent } from 'react';

interface Props {
  defaultValue: string;
  onSearch: (term: string) => void;
}

interface State {
  value: string;
}

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: props.defaultValue };
  }

  handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.handleSearch();
    }
  };

  handleSearch = () => {
    const trimmed = this.state.value.trim();
    this.props.onSearch(trimmed);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="search-bar">
        <input
          type="text"
          value={value}
          placeholder="Search..."
          onChange={this.handleInput}
          onKeyDown={this.handleKeyPress}
          tabIndex={1}
          aria-label="Search Pokemon"
        />
        <button type="button" onClick={this.handleSearch} tabIndex={2}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
