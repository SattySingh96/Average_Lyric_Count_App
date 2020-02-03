import React, { Component } from 'react';
import './App.css';
import {FaSearch} from 'react-icons/fa'
import {fetchArtistMBID, fetchAllTracksByArtistMBID, averageOfLyrics, findMaxLyric} from '../src/utils/api';
import axios from 'axios';


class App extends Component {  
  state = {
    artist: "",
    lyricsList: [],
    average: 0
    // maxLyric:''
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]:target.value }, () => {})
    console.log(this.state.artist)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetchArtistMBID(this.state.artist)   //--Fetches the MusicBrainz ID for the artist given
    .then((MBID) => {    
      fetchAllTracksByArtistMBID(MBID)
      .then((tracks) => {                //---Fetches all tracks associated with that artists MBID
        tracks.forEach((track) => {
          return axios.get(`https://api.lyrics.ovh/v1/${this.state.artist}/${track}`)
          .then((lyric) => {                                                                 //-------Getting mutiple duplicate songs too, need to remove them ---- use Lodash --- uniq
            console.log(lyric.data.lyrics.replace(/\r?\n|\r|\*|\[|\]|\(|\?|\)|\.|:|;|,|—|\s/g,' '))
            this.state.lyricsList.push(lyric.data.lyrics.replace(/\r?\n|\r|\*|\[|\]|\(|\?|\)|\.|:|;|,|—|-|\s/g,' '))          //-----Lyrics im getting back are maybe not the right format, too many commas and new lines, need to format data first then use it, perhaps/????
            this.setState({ average : averageOfLyrics(this.state.lyricsList)})      //-----Need to remove the spaces and such, word count too high
            this.setState({ maxLyric : findMaxLyric(this.state.lyricsList)})            
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

  renderMaxLyric = () => {
    return (
      <h1 className='maxLyric'>
        {this.state.maxLyric}        
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
        <div className='avgBox'>
          {this.renderAverage()}    
        </div> 
        <div className='maxWordBox'>
          {this.renderMaxLyric()}          
        </div>      
    </div>      
    );
  }
}

export default App;

