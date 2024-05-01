import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./templates/Loader";
import Topnav from "./templates/Topnav";
import DropDown from "./templates/DropDown";
import CardOfTrending from "./templates/CardOfTrending";

function Movie() {
  document.title = " Movie App | Movies ";

  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      //   setMovie(data.results);
      // console.log(data);

      if (data.results.length > 0) {
        setmovie((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
      //

      // console.log(data);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  //   console.log(Movie);

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setpage(1);
      setmovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return movie.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full  flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#7360ed] text-[#6556CD] ri-arrow-left-line"
          ></i>
          {""}
          movie
          <small className="text-sm ml-2 text-zinc-600 ">({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="category"
            options={["popular", "top_rated", "upcoming", "now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <CardOfTrending data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Movie;
