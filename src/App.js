import React, { Component } from 'react';
import './App.css';
import {FaSearch} from 'react-icons/fa'
import {fetchArtistMBID, fetchAllTracksByArtistMBID, fetchLyricsForEachTrack} from '../src/utils/api';

class App extends Component {  
  state = {
    artist: ""
  }

  handleChange = ({target}) => {
    this.setState({ [target.name]:target.value }, () => {})
  }


//Create handleSubmit button






  render() {
    return (      
    <div className='mainSearchBox'>           
      <input 
      className='searchBar' 
      type='text' 
      name='artist'
      onChange={this.handleChange}
      value={artist}
      />       
      <button className='searchButton'  onPress={this.handleSubmit}>
        <FaSearch />
      </button>  
    </div>
    );
  }
}

export default App;

