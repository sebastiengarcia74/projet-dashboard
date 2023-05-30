import Spotify from "../components/Spotify";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import PageOne from "@/components/api";
const inter = Inter({ subsets: ["latin"] });
import axios from "axios";
import { Star } from "../components/Nasa";
import NavBar from "@/components/NavBar";
import { useSearchParams } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { News } from "../components/news";
import { Quote } from "../components/chuck";
import  Profile, {Api} from "../components/api.js"
import Cookies from "js-cookie";

export default function Home() {
  const searchParams = useSearchParams();
  const access = searchParams.get("connected");
  const [isSpotifyConnected, setSpotifyConnexion] = useState(false);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setUserId(Cookies.get("_id"));
  }, [Cookies.get("_id")]);

  useEffect(() => {
    if (access !== null) {
      console.log(access);
      setSpotifyConnexion(true);
    }
  }, [access]);
  return (
    <main>
      <ToastContainer />
      <NavBar />


      {userId && (
        <section className="flex flex-wrap mt-12">
          <Spotify connected={isSpotifyConnected} />
          <News />
          <Quote />
         <Star />
          <Profile />
      </section>)}
        </main>
  ) 
}
