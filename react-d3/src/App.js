import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/chart';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Playing with React and D3</h1>
        </header>

        <Chart />
      </div>
    );
  }
}

export default App;
