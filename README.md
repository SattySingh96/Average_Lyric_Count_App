# Tech Test - Average Word Count

## Getting Setup - Locally

1. Before opening or running the app, Node package manager is needed to install dependencies, follow the below link to install npm & node.js (If already installed, skip to step 2):

```
https://www.npmjs.com/get-npm
```

2. Open terminal, and run the following commands to clone down the repo and move into the folder:

```
git clone https://github.com/SattySingh96/Average_Lyric_Count_App.git

cd ./Average_Lyric_Count_App
```

3. Run the following command to install all dependencies:

```
npm install
```
4. Run the app locally:

```
npm start
```
5. Enter an artist in the searchbar and click the search button to get back:

* Average lyric count across all songs.
* Longest lyric used by the artist.
* Word cloud visualising the lyrics from the first 10 songs sent back by the API.

## Testing

Testing was done using Mocha & Chai

1. Run the following command to run tests:

```
npm run test-utils
```

