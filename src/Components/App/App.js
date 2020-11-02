import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: 'song1',
          artist: 'artist1',
          album: 'album1',
          id: 1
        },
        {
          name: 'song2',
          artist: 'artist2',
          album: 'album2',
          id: 2
        },
        {
          name: 'song3',
          artist: 'artist3',
          album: 'album3',
          id: 3
        }
      ],
      playlistName: 'My Playlist',
      playlistTracks: [
        {
          name: 'pltrack1',
          artist: 'plartist1',
          album: 'plalbum1',
          id: 4
        },
        {
          name: 'pltrack2',
          artist: 'plartist2',
          album: 'plalbum2',
          id: 5
        },
        {
          name: 'pltrack3',
          artist: 'plartist3',
          album: 'plalbum3',
          id: 6
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
 
  render() {
    return (
      <div>
        <h1>The <span className="highlight">Frequen</span>cy</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> 
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} /> 
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
