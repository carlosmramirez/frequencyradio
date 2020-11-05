let accessToken;
const clientId = '83c033ee64d74b6ea1bd807745c044d8';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    // check for access token in URL
    const accessTokenMatch = window.location.href.match(/access_token([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in([^&]*)/);
    // console.log(accessTokenMatch)
    
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // clears authorization parameters when expired
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public&response_type=token`;
      window.location = accessUrl;
    }
  }, 
  
  search(term) {
    const accessTokenSearch = Spotify.getAccessToken() ? Spotify.getAccessToken().substring(1) : Spotify.getAccessToken();
    console.log('TOKEN: ' + accessTokenSearch);
    return (
      fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: {
          Authorization: `Bearer ${accessTokenSearch}`
        } 
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request Failed!'); 
      }, networkError => console.log(networkError.message)
      ).then(jsonResponse => {
        if (!jsonResponse) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      })
    );  
  },

  savePlaylist(playlistName, trackUris) {
    if(playlistName && trackUris) {
      return;
    }
    
    const accessToken = Spotify.getAccessToken() ? Spotify.getAccessToken().substring(1) : Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let userId;
    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then((response) => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request Failed: User ID!');
    }, (networkError) => console.log(networkError.message)
    ).then((jsonResponse) => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: playlistName })
      }).then((response) => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request Failed: Make New Playlist!');
      }, (networkError) => console.log(networkError.message)
      ).then((jsonResponse) => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        })
      });
    })
  }
}


export default Spotify; 