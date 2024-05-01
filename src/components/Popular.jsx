import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './templates/Loader';
import Topnav from './templates/Topnav';
import DropDown from './templates/DropDown';
import CardOfTrending from './templates/CardOfTrending';


function Popular() {

    document.title = " Movie App | Popular "

    const navigate = useNavigate();
    const [category, setcategory] = useState("movie");
    const [Popular, setPopular] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)



    const GetPopular = async () => {
        try {
          const { data } = await axios.get(`${category}/popular?page=${page}`);
        //   setPopular(data.results);
        // console.log(data);
        
        if (data.results.length > 0) {
            setPopular((prevState)=>[...prevState, ...data.results]);
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
    
      //   console.log(Popular);
    
      const refreshHandler = ()=> {
        if (Popular.length === 0) {
           GetPopular();
        }  else {
            setpage(1);
            setPopular([]);
            GetPopular();
        }
      }
    
    
    
      useEffect(() => {
       refreshHandler()
      }, [category]);







  return Popular.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full  flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#7360ed] text-[#6556CD] ri-arrow-left-line"
          ></i>
          Popular
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          <DropDown
            title="category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
      dataLength={Popular.length}
      next={GetPopular}
      hasMore={hasMore}
      loader={<h1>Loading...</h1>}
      >
        <CardOfTrending data={Popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default Popular