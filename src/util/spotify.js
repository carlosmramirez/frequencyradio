let accessToken;
const clientId = '83c033ee64d74b6ea1bd807745c044d8';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    // check for access token in URL
    const accessTokenMatch = window.location.href.match(/access_Token([^&*])/);
    const expiresInMatch = window.location.href.match(/expires_in([^&*])/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // clears authorization parameters when expired
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?
      client_id=${clientId}&redirect_uri=${redirectUri}&scope=playlist-modify-public
      &response_type=token`;
      window.location = accessUrl;
    }

  } 
};

export default Spotify; 