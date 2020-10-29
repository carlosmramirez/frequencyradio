import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>The <span className="highlight">Frequen</span>cy</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults /> 
            {/* <Playlist /> */} 
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
