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
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
            This can be modified to create something that renders on a web page
        </p>

        <Chart />
      </div>
    );
  }
}

export default App;
