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
    .get(`http://musicbrainz.org/ws/2/recording?artist=${MBID}&limit=100&fmt=json`)
    .then((data) => {  
      console.log(data)         
      const songsList = data.data.recordings;
      for (let i = 0; i < songsList.length; i++) {
        trackList.push(songsList[i].title)          //-----Change to Map array method instead
      }       
      return trackList
    })
  }
}

exports.averageOfLyrics = (list) => {
  const lyricWordList = [];
  let count = 0;  
  for (let i = 0; i < list.length; i++) {
    lyricWordList.push(list[i].split(' '))
  }   
  for (let i = 0; i < lyricWordList.length; i++) {
    for (let j = 0; j < lyricWordList[i].length; j++) {
      count++ 
    }          
  }  
  return Math.round(count/list.length)
}

exports.findMaxLyric = (list) => {
  const lyricWordList = [];
  let maxLyric = '';
  for (let i = 0; i < list.length; i++) {
    lyricWordList.push(list[i].split(' '))
  }   
  for (let i = 0; i < lyricWordList.length; i++) {
    for (let j = 0; j < lyricWordList[i].length; j++) {
       if (lyricWordList[i][j].length > maxLyric.length) {
         maxLyric = lyricWordList[i][j];
       } 
    }          
  }  
  return maxLyric
}

exports.findMinLyric = (list) => {
  const lyricWordList = [];
  let minLyric = '';
  for (let i = 0; i < list.length; i++) {
    lyricWordList.push(list[i].split(' '))
  }   
  for (let i = 0; i < lyricWordList.length; i++) {
    lyricWordList[i].reduce((a,b) => {
      if (a.length <= b.length) {
        return a;
      } else {
        return b;
      }
    });         
  }  
  return minLyric
}






// exports.fetchLyricsForEachTrack = (artist, trackList) => {
//   if (trackList.length === 0 || artist.length === 0) {
//     return [];
//   } 
//   const returnArr = [];
//   trackList.forEach((track) => {
//     axios
//     .get(`https://api.lyrics.ovh/v1/${artist}/${track}`)
//     .then((lyric) => {
//       console.log(lyric.data.lyrics)
//       returnArr.push(lyric.data.lyrics)
//     })
//   })
//   console.log(returnArr)
//   return returnArr; 
// }

// const promiseList = [];
//   if (trackList.length === 0 || artist.length === 0) {
//     return [];
//   } 
//   else {
//     for (let i = 0; i < trackList.length; i++) {
//       promiseList.push(axios.get(`https://api.lyrics.ovh/v1/${artist}/${trackList[i]}`))    
//     }
//     Promise.all(promiseList).then((values) => {
//       const lyricList = values.map((response) => {return response.data.lyrics})
//       console.log(lyricList)
//       return lyricList
//     })      
//   }


























