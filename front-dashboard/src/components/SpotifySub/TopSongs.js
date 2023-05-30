import React, { useState, useEffect } from "react";
import axios from "axios";

const TopSongs = (props) => {
  const [topSongs, setTopSongs] = useState([]);
  console.log(props.artistId);
  const artistId = props.artistId;
  // https://api.spotify.com/v1/artists/{id}/top-tracks

  // useEffect(()=>{

  // },[])

  const handleAudio = (e) => {
    console.log("audio click")
    console.log(e);
  };

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8001/top-five?artistId=${artistId}`
        );

        // console.log(response.data);
        // console.log(response.data.tracks[0].album.name);
        // console.log(response.data.tracks[0].name);
        // console.log(response.data);
        // const songsDataRes = response.data.tracks;
        const songs = [];
        let index = 0;
        while (index < 5) {
          const songData = {
            songName: response.data.tracks[index].name,
            albumName: response.data.tracks[index].album.name,
            songUrl: response.data.tracks[index].preview_url,
          };
          songs.push(songData);

          index++;
        }

        setTopSongs(songs);
      } catch (err) {
        console.log(err);
      }
    };
    if (topSongs.length == 0) getTopTracks();

    if (topSongs) console.log(topSongs);
  }, [topSongs]);

  return (
    <div>
      {topSongs.length !== 0
        ? topSongs.map((song, index) => (
            <div key={index} className="flex flex-col justify-center">
              <span className="text-center">Song: {song.songName}</span>
              <span className="text-center">Album: {song.albumName}</span>
              <audio
                className="audio-plr"
                onClick={() => handleAudio()}
                controls
              >
                <source  onClick={(e) => handleAudio(e)} src={song.songUrl}></source>
              </audio>
            </div>
          ))
        : ""}
      <section></section>
    </div>
  );
};

export default TopSongs;

// https://www.w3schools.com/jsref/met_audio_pause.asp
