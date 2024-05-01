import React from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import DropDown from "./templates/DropDown";
import { useState } from "react";
import { useEffect } from "react";
import CardOfTrending from "./templates/CardOfTrending";
import Loader from "./templates/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

function Trending() {
    const navigate = useNavigate();
    const [category, setcategory] = useState("all");
    const [duration, setduration] = useState("day");
    const [trending, settrending] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);

    document.title = " Movie App | Trending " + category.toUpperCase();

  const Gettrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
    //   settrending(data.results);
    
    if (data.results.length > 0) {
        settrending((prevState)=>[...prevState, ...data.results]);
        setpage(page + 1);
        
    } else{
          sethasMore(false);
    }
    //   

      // console.log(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  //   console.log(trending);

  const refreshHandler = ()=> {
    if (trending.length === 0) {
       Gettrending();
    }  else {
        setpage(1);
        settrending([]);
        Gettrending();
    }
  }



  useEffect(() => {
   refreshHandler()
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full  flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#7360ed] text-[#6556CD] ri-arrow-left-line"
          ></i>
          Trending
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="category"
            options={["tv", "movie", "all"]}
            func={(e) => setcategory(e.target.value)}
          />

          <div className="w-[2%]"></div>

          <DropDown
            title="duration"
            options={["week", "day"]}
            func={(e) =>setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
      dataLength={trending.length}
      next={Gettrending}
      hasMore={hasMore}
      loader={<h1>Loading...</h1>}
      >
        <CardOfTrending data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Trending;
