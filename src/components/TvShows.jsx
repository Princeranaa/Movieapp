import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './templates/Loader';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import CardOfTrending from './templates/CardOfTrending';


function TvShows() {
  
  document.title = " Movie App | Tv Shaows"

  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true)



  const GetTv = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
      //   settv(data.results);
      // console.log(data);
      
      if (data.results.length > 0) {
          settv((prevState)=>[...prevState, ...data.results]);
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
  
    //   console.log(tv);
  
    const refreshHandler = ()=> {
      if (tv.length === 0) {
         GetTv();
      }  else {
          setpage(1);
          settv([]);
          GetTv();
      }
    }
    useEffect(() => {
     refreshHandler()
    }, [category]);


  return tv.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full  flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#7360ed] text-[#6556CD] ri-arrow-left-line"
          ></i>
          Tv Shows<small className='text-sm ml-2 text-zinc-600 '>({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="category"
            options={["on_the_air", "top_rated", "popular","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
      dataLength={tv.length}
      next={GetTv}
      hasMore={hasMore}
      loader={<h1>Loading...</h1>}
      >
        <CardOfTrending data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default TvShows