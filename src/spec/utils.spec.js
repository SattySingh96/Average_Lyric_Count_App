const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const {fetchArtistMBID, fetchAllTracksByArtistMBID, createWordCloudData, averageOfLyrics, findMaxLyric, wordFreqInLyrics} = require('../utils/api');


describe('fetchArtistMBID', () => {
    it('When invoked with a one-word artist name, return the artists MBID', () => {   
        const input = fetchArtistMBID('cher');    
        return expect(input).to.eventually.be.a('string');  
    });
    it('When invoked with a multiple-word artist name, return the artists MBID', () => {   
        const input = fetchArtistMBID('deacon blue');    
        return expect(input).to.eventually.be.a('string'); 
    });   
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
});

describe('averageOfLyrics', () => {
    it('When passed an empty lyrics array, the function returns 0', () => {
        const input = averageOfLyrics([]);
        expect(input).to.equal(0)        
    });
    it('When passed an array with a single set of lyrics, the function retuns the length of that set of lyrics', () => {
        const input = averageOfLyrics(['These are test lyrics'])
        expect(input).to.equal(4)
         
    });
    it('When passed an array of multiple sets of lyrics, the function returns the average word count across all sets of lyrics', () => {
        const input = averageOfLyrics(['This is test lyric number 1', 'These are test lyrics', 'Test lyrics']);
        expect(input).to.equal(4)
    });
});

describe('findMaxLyric', () => {
    it('When passed an empty lyrics array, the function returns an empty string', () => {
        const input = findMaxLyric([]);
        expect(input).to.equal('')        
    });
    it('When passed an array with a single set of lyrics, the function retuns the longest word in that set of lyrics', () => {
        const input = findMaxLyric(['These are test lyrics'])
        expect(input).to.equal('lyrics')
         
    });   
    it('When passed an array of multiple sets of lyrics, the function returns the longest word out of all the lyric sets', () => {
        const input = findMaxLyric(['test one', 'test two', 'test three']);
        expect(input).to.equal('three')
    });
});

describe('wordFreqInLyrics', () => {
    it('when passed an empty array, the function returns an empty array', () => {
        const input = wordFreqInLyrics([])
        expect(input).to.deep.equal([])
    });
    it('when passed an array with a single set of lyrics, the function returns an array containing a single object detailing the frequency of words', () => {
        const input = wordFreqInLyrics(['These are are the the the test test test test lyrics lyrics lyrics lyrics lyrics'])
        expect(input).to.be.an('array').and.to.have.a.lengthOf(1)
    });
    it('when passed an array with mulitple sets of lyrics, the function returns an array containing multiple objects detailing the frequency of words for each set of lyrics', () => {
        const input = wordFreqInLyrics(['These are are the the the test test test test lyrics lyrics lyrics lyrics lyrics','These are are the the the test test test test lyrics lyrics lyrics lyrics lyrics'])
        expect(input).to.be.an('array').and.to.have.a.lengthOf(2)
    });
});

describe('createWordCloudData', () => {
    it('When given an empty frequency array, the function returns an empty array', () => {
        const input = createWordCloudData([])
        expect(input).to.deep.equal([])        
    })    
    it('When given an array containing frequency objects (as returned by the wordFreqInLyrics function), the function returns an array containing formatted data compatabile with react-tagcloud', () => {
        const input = createWordCloudData([{"Test": 3, "Word": 8}])
        expect(input).to.deep.equal([{ value: "Test", count: 3 }, { value: "Word", count: 8 }])        
    })  
})