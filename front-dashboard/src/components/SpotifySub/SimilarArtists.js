import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const SimilarArtists = (props) => {
  const [similarArtists, setSimilarArtists] = useState([]);

  console.log(props.artistId);
  const artistId = props.artistId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8001/similar?artistId=${artistId}`
        );

        console.log(response.data);
        let index = 0;
        const artistsInfo = [];
        while (index < 10) {
          const artistData = {
            artistUrl: response.data[index].external_urls.spotify,
            artistName: response.data[index].name,
          };
          artistsInfo.push(artistData);
          index++;
        }

        console.log(artistsInfo);
        setSimilarArtists(artistsInfo);
      } catch (err) {
        console.log(err);
      }
    };

    if (similarArtists.length == 0) fetchData();
  }, [similarArtists]);

  return (
    <div>
      {similarArtists.length > 0 && (
        <div>
          {similarArtists.map((artist, index) => (
            <section key={index} className="flex flex-col mb-2">
              {" "}
              <Link
                className="link text-center"
                target="_blank"
                href={artist.artistUrl}
              >
                {artist.artistName}
              </Link>
            </section>
          ))}
        </div>
      )}
      <span>{props.info}</span>
    </div>
  );
};

export default SimilarArtists;
