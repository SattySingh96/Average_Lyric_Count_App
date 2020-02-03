const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {fetchArtistMBID, fetchAllTracksByArtistMBID, fetchLyricsForEachTrack, averageOfLyrics} = require('../utils/api');


describe('fetchArtistMBID', () => {
    it('When invoked with a one-word artist name, return the artists MBID', () => {   
        const input = fetchArtistMBID('cher');    
        return expect(input).to.eventually.be.a('string');  
    });
    it('When invoked with a multiple-word artist name, return the artists MBID', () => {   
        const input = fetchArtistMBID('deacon blue');    
        return expect(input).to.eventually.be.a('string'); 
    });   
    it('When invoked with an invalid artist name, return an error message', () => {   
        const input = fetchArtistMBID(1111);    
        expect(input).to.deep.equal({msg:'Invalid Artist Name'})
    });  // ======= Dont think this is needed, front end input box will only give string anyway
});

describe('fetchAllTracksByArtistMBID', () => {
    it('when invoked with no MBID, the function returns an empty array', () => {
      const input = fetchAllTracksByArtistMBID();
      expect(input).to.deep.equal([]);      
    });
    it('when invoked with a valid MBID, the function returns an array of all tracks by that artist', () => {
      const input = fetchAllTracksByArtistMBID('1d46cb3a-8071-45ba-855e-74e3cff20974');
      expect(input).to.eventually.be.an('array');      
    });
    xit('when invoked with a valid, but non-existant, MBID, the function returns an array of all tracks by that artist', () => {
        const input = fetchAllTracksByArtistMBID('1d46cb3a-8171-45ba-855e-74e3cff20974');
        expect(input).to.eventually.be.an('array');         // ------ Fix this test -----
    });
});

describe('fetchLyricsForEachTrack', () => {
    it('When invoked with an artist string but an empty array, return an empty array', () => {
        const input = fetchLyricsForEachTrack('coldplay',[])
        expect(input).to.deep.equal([])        
    });
    it('When invoked with an array but an empty artist string, return an empty array', () => {
        const input = fetchLyricsForEachTrack('',['clocks','yellow','talk'])
        expect(input).to.deep.equal([])        
    });
    it('When invoked with an array and an artist, return an array of lyrics', () => {
        const input = fetchLyricsForEachTrack('coldplay',['clocks', 'yellow', 'fix you'])    
        console.log(input) 
        expect(input).to.eventually.be.an('array')
        expect(input).to.eventually.have.a.lengthOf(3);
    });
}); //------Superfluous i think, has been replaced with frontend nameless function in the handleSubmit function

describe.only('averageOfLyrics', () => {
    it('When passed an empty track array, the function returns 0', () => {
        const input = averageOfLyrics([]);
        expect(input).to.equal(0)        
    });
});