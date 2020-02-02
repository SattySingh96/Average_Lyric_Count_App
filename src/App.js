import React, { Component } from 'react';
import './App.css';
import {FaSearch} from 'react-icons/fa'
import {fetchArtistMBID, fetchAllTracksByArtistMBID, fetchLyricsForEachTrack} from '../src/utils/api';

class App extends Component {  
  state = {

  }


  handleSubmit = (event) => {
    event.preventDefault();


  }






  render() {
    return (      
    <div className='mainSearchBox'>           
      <input className='searchBar' type='text' name='artist'/>       
      <button className='searchButton' type='button' onPress={this.handleSubmit}>
        <FaSearch />
      </button>  
    </div>
    );
  }
}

export default App;

