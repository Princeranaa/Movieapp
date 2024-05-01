import React, { useState, useEffect } from "react";
import SideNav from "./templates/SideNav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HoriizontalCards from "./templates/HoriizontalCards";
import DropDown from "./templates/DropDown";
import Loader from "./templates/Loader";

function Home() {
  document.title = "Movie App | Homepage";

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getWallPaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomData = data.results[randomIndex];
      setWallpaper(randomData);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getTrending();
    if (!wallpaper) {
      getWallPaper();
    }
  }, [category]);

  return (
    <div className="flex w-full h-screen">
      <SideNav />
      <div className="w-full h-full overflow-auto">
        <Topnav />
        {wallpaper && (
          <Header data={wallpaper} />
        )}
        <div className="p-5 justify-between flex">
          <h1 className="text-3xl text-zinc-400 font-semibold">Trending</h1>
          <DropDown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
        {trending ? (
          <HoriizontalCards data={trending} />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Home;
