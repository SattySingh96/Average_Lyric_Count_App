import React, { Component } from 'react';
import './App.css';
import {FaSearch} from 'react-icons/fa'
import {fetchArtistMBID, fetchAllTracksByArtistMBID, averageOfLyrics, findMaxLyric, wordFreqInLyrics, createWordCloudData} from '../src/utils/api';
import axios from 'axios';
import { TagCloud } from 'react-tagcloud'


class App extends Component {  
  state = {
    artist: "",
    lyricsList: [],
    average: 0,
    maxLyric:'',
    lyricFreqObj: [],
    wordCloudData: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.artist !== prevState.artist) {
     this.setState({
      lyricsList: [],
      average: 0,
      maxLyric:'',
      lyricFreqObj: [],
      wordCloudData: []
     });
    }
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]:target.value }, () => {})
  }

  handleSubmit = (event) => {
    event.preventDefault();    
    fetchArtistMBID(this.state.artist)                                                                      // Fetches the MusicBrainz ID for the artist given
    .then((MBID) => {    
      fetchAllTracksByArtistMBID(MBID)
      .then((tracks) => {                                                                                   // Fetches all tracks associated with that artists MBID
        tracks.forEach((track) => {
          return axios.get(`https://api.lyrics.ovh/v1/${this.state.artist}/${track}`)
          .then((lyric) => {   
            const regex = /\r?\n|\r|\*|\[|\]|\(|\?|\)|\.|:|;|,|—|-|=|\s/g                                   // Fetches lyrics for each track, then passes the data through averageOfLyrics & findMaxLyric functions
            this.state.lyricsList.push(lyric.data.lyrics.replace(regex,' '))        
            this.setState({ 
              average : averageOfLyrics(this.state.lyricsList), 
              maxLyric : findMaxLyric(this.state.lyricsList), 
              lyricFreqObj : wordFreqInLyrics(this.state.lyricsList),
              wordCloudData : createWordCloudData(this.state.lyricFreqObj.slice(0,5))            
            })                
          })
        })        
      })
    })    
  }    
  
  renderAverage = () => {                                                
      return (
        <h1 className='averageCount'>
          Average Number of Words: {this.state.average}
        </h1>
      )        
  }

  renderMaxLyric = () => {                                                 
    return (
      <h1 className='maxLyric'>
        Longest Lyric: {this.state.maxLyric}        
      </h1>    
    )
  } 

  renderWordCloud = () => {
    return (
      <TagCloud
      minSize={12}
      maxSize={55}
      tags={this.state.wordCloudData}
      className="simple-cloud"
      style={{textAlign: 'center' }}
      onClick={tag => alert(`'${tag.value}' was selected!`)}
    />
    )
  }
 

render() {
    return (   
      <div>
        <h1 className='title'>Enter An Artist</h1>
        <div className='mainSearchBox'>           
          <input className='searchBar' type='text' name='artist' onChange={this.handleChange} value={this.state.artist}/>       
          <button className='searchButton' onClick={this.handleSubmit}>
            <FaSearch />
          </button>  
        </div>
        <div className='avgBox'>
          {this.renderAverage()}    
        </div> 
        <div className='maxWordBox'>
          {this.renderMaxLyric()}              
        </div>  
        <div>
          {this.renderWordCloud()}
        </div>           
    </div>      
    );
  }
}

export default App;

