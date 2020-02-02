const axios = require('axios')

exports.fetchArtistMBID = (artist) => {
  if (typeof artist !== "string") {
    return {msg:'Invalid Artist Name'}
  } else {
    return axios
    .get(`http://musicbrainz.org/ws/2/artist/?query=artist:${artist}&fmt=json`) 
    .then((data) => {
      return data.data.artists[0].id;   //-----------Console.log(data.data.artists[0].id)
    });
  };
};

exports.fetchAllTracksByArtistMBID = (MBID) => {
  const trackList = [];
  if (MBID === undefined) {
    return trackList
  } else {
    return axios
    .get(`http://musicbrainz.org/ws/2/work?artist=${MBID}&limit=100&fmt=json`)
    .then((data) => {           
      const songsList = data.data.works;
      for (let i = 0; i < songsList.length; i++) {
        trackList.push(songsList[i].title)          //-----Change to Map array method instead
      }       
      return trackList
    })
  }
}

exports.fetchLyricsForEachTrack = (artist, trackList) => {
  const promiseList = [];
  if (trackList.length === 0 || artist.length === 0) {
    return [];
  } 
  else {
    for (let i = 0; i < trackList.length; i++) {
      promiseList.push(axios.get(`https://api.lyrics.ovh/v1/${artist}/${trackList[i]}`))    
    }
    Promise.all(promiseList).then((values) => {
      const lyricList = values.map((response) => {return response.data.lyrics})
      console.log(lyricList)
      return lyricList
    })      
  }
}





























