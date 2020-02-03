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
      console.log(data)         
      const songsList = data.data.works;
      for (let i = 0; i < songsList.length; i++) {
        trackList.push(songsList[i].title)          //-----Change to Map array method instead
      }       
      return trackList
    })
  }
}

exports.averageOfLyrics = (list) => {
  let count = 0;                           //-----Change name of function - something more relevant
  if (list.length === 0) {
    return count; 
  } else {
   const lyricWordList = [];     
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