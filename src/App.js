import React, { Component } from 'react';
import './App.css';
import {FaSearch} from 'react-icons/fa'
import {fetchArtistMBID, fetchAllTracksByArtistMBID, averageOfLyrics} from '../src/utils/api';
import Axios from 'axios';

class App extends Component {  
  state = {
    artist: "",
    lyricsList: [],
    average: 0
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]:target.value }, () => {})
    console.log(this.state.artist)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetchArtistMBID(this.state.artist)
    .then((MBID) => {    
      fetchAllTracksByArtistMBID(MBID)
      .then((tracks) => {  
        tracks.forEach((track) => {
          return Axios.get(`https://api.lyrics.ovh/v1/${this.state.artist}/${track}`)
          .then((lyric) => {
            this.state.lyricsList.push(lyric.data.lyrics)
            console.log(this.state.average)
            this.setState({ average : averageOfLyrics(this.state.lyricsList)})                 
          })
        })        
      })
    })
  }  
  
  renderAverage = () => {   
      return (
        <h1 className='averageCount'>
          {this.state.average}
        </h1>
      )  
  }


  render() {
    return (   
      <div>
        <h1 className='title'>Please Enter An Artist</h1>
        <div className='mainSearchBox'>           
          <input className='searchBar' type='text' name='artist' onChange={this.handleChange} value={this.state.artist}/>       
          <button className='searchButton' onClick={this.handleSubmit}>
            <FaSearch />
          </button>  
        </div>
        <div>
          {this.renderAverage()}     
        </div>
    </div>      
    );
  }
}

export default App;

