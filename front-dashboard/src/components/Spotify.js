import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";
import ArtistInfo from "../components/SpotifySub/ArtistInfo";
import SimilarArtists from "../components/SpotifySub/SimilarArtists";
import TopSongs from "../components/SpotifySub/TopSongs";

const Spotify = (props) => {
  const [userId, setUserId] = useState(null);
  const [artistName, setArtistName] = useState("");
  const [artistInfo, setArtistInfo] = useState();
  const [artistId, setArtistId] = useState();
  const [artistTopSongs, setArtistTopSongs] = useState({});
  const [similarArtists, setSimilarArtists] = useState({});
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    setUserId(Cookies.get("_id"));

    if (userId) console.log(userId);
  }, [userId]);

  const handleSearchInput = (e) => {
    setArtistName(e.target.value);
  };
  const searchArtist = async () => {
    try{
      const postArtistInput = await axios.post(
        `http://localhost:8001/search?artist=${artistName}&userId=${userId}`
      );
  
      // console.log(postArtistInput.data);
      console.log(postArtistInput.data.artists.items[0].external_urls.spotify);
      // console.log(postArtistInput.data.artists[0].items[0].images[0]);
      const imgDataRes = postArtistInput.data.artists.items[0].images[0].url;
      const artistNameRes = postArtistInput.data.artists.items[0].name;
      const artistGenresRes = postArtistInput.data.artists.items[0].genres;
      setArtistId(postArtistInput.data.artists.items[0].id);
      const spotifyLinkRes = postArtistInput.data.artists.items[0].external_urls.spotify
  
      const artistDetails = {
        artistName: artistNameRes,
        imgUrl: imgDataRes,
        artistGenres: artistGenresRes,
        spotifyLink: spotifyLinkRes
       
  
      };
  
      setArtistInfo(artistDetails);
      
    }catch(err){
      console.log(err)
    }
    setArtistName("")
    setActiveTab("info")
  };

  const handleTabs = (e) => {
    console.log(e);
    // console.log(e.target)
    console.log(e.dataset.value);
    // e.target.classList.add('tab-active')
    setActiveTab(e.dataset.value);
  };

  return (
    <section className="w-3/12 rounded-lg p-2 m-3 min-w-[360px] overflow-auto border-double

    border border-sky-500 max-h-[38rem]">
      {props.connected ? (
        <div>
          <div className="flex">
            <input
              className="input input-bordered w-full max-w-xs"
              value={artistName}
              type="text"
              placeholder="find an artist"
              onChange={(e) => handleSearchInput(e)}
            />
            <button onClick={searchArtist} className="ml-1 btn">
              search
            </button>
          </div>

          
          {artistInfo ? (
            <section>

<div
            className="mt-1 tabs tabs-boxed "
            onClick={(e) => handleTabs(e.target)}
          >
            <a
              data-value="info"
              className={
                activeTab == "info"
                  ? "tab-active tab tab-bordered"
                  : "tab tab-bordered"
              }
            >
              Artist Info
            </a>
            <a
              data-value="topFive"
              className={
                activeTab == "topFive"
                  ? "tab-active tab tab-bordered"
                  : "tab tab-bordered"
              }
            >
              Top 5 songs
            </a>
            <a
              data-value="similar"
              className={
                activeTab === "similar"
                  ? "tab-active tab tab-bordered"
                  : "tab tab-bordered"
              }
            >
              Similar Artists
            </a>
          </div>

              <div>
               
                {activeTab == "info" && <ArtistInfo info={artistInfo} />}
                {activeTab == "topFive" && <TopSongs artistId={artistId} />}
                {activeTab == "similar" && <SimilarArtists artistId={artistId} />}
              </div>
            </section>
          ) : (
            <div className="flex justify-center">
              <img className="rounded-full m-1 w-40 "  src="https://res.cloudinary.com/dbivyjzla/image/upload/v1683195983/spotify-logo_vm3lsw.jpg"  alt="Spotify logo"></img>
            </div>
            
          )}
        </div>
      ) : (
        <Link
          className="flex btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-black flex-nowrap"
          href={`http://localhost:8001/login/${userId}`}
        >
          <span className="mr-2">connect to Spotify</span>
          <div className="w-16 rounded">
            <img
              className="rounded-full"
              src="https://res.cloudinary.com/dbivyjzla/image/upload/v1683195983/spotify-logo_vm3lsw.jpg"
              alt="Spotify logo"
            />
          </div>
        </Link>
      )}
    </section>
  );
};

export default Spotify;
