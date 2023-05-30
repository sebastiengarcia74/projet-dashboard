import Link from "next/link";


const ArtistInfo = (props) => {
  console.log(props.info);
  const info = props.info;
  const imgUrl = info.imgUrl;
  const name = info.artistName;
  const genres = info.artistGenres;
  const link = info.spotifyLink
  //
  return (
    <div className="flex flex-col">
        <span className="text-center text-2xl"><Link className="link" target="_blank" href={link}>{name}</Link></span>
        {genres.map((genre,i) => <span key={i} className="text-center">{genre}</span>)}
      <img className="w-full rounded-md" src={imgUrl} alt="band profile picture" />
    </div>
  );
};

export default ArtistInfo;
