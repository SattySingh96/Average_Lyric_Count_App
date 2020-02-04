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
    lyricFreqObj: []
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
            this.setState({ average : averageOfLyrics(this.state.lyricsList), maxLyric : findMaxLyric(this.state.lyricsList), lyricFreqObj : wordFreqInLyrics(this.state.lyricsList)})     
            console.log(this.state.lyricFreqObj[0])
          })
        })        
      })
    })    
  }  
  
  renderAverage = () => {                                                  // Renders average number of words for each artist, from the value in state
      return (
        <h1 className='averageCount'>
          Average Number of Words: {this.state.average}
        </h1>
      )        
  }

  renderMaxLyric = () => {                                                 // Renders longest word for each artist, from the value in state
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
      maxSize={35}
      tags={createWordCloudData(this.state.lyricFreqObj.slice(0,1))}
      className="simple-cloud"
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

