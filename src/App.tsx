import { Component } from 'react';
import './App.css';

class App extends Component<Record<string, never>, { count: number }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;
    return (
      <div className="app__container">
        <h1>Vite + React (Class Components)</h1>
        <button
          type="button"
          onClick={() => this.setState({ count: count + 1 })}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    );
  }
}

export default App;
