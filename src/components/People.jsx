import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from '../utils/axios';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from './templates/Loader';
import Topnav from './templates/Topnav';
// import DropDown from './templates/DropDown';
import CardOfTrending from './templates/CardOfTrending';

function People() {
    
    document.title = " Movie App | person Shaows"

    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [person, setperson] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true)
  
  
  
    const GetPerson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}?page=${page}`);
        //   setperson(data.results);
        // console.log(data);
        
        if (data.results.length > 0) {
            setperson((prevState)=>[...prevState, ...data.results]);
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
    
      //   console.log(person);
    
      const refreshHandler = ()=> {
        if (person.length === 0) {
           GetPerson();
        }  else {
            setpage(1);
            setperson([]);
            GetPerson();
        }
      }
    
    
    
      useEffect(() => {
       refreshHandler()
      }, [category]);


  return person.length > 0 ? (
    <div className="w-screen h-screen">
      <div className=" px-[5%] w-full  flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400 ">
          <i
            onClick={() => navigate(-1)}
            className="mr-2 hover:text-[#7360ed] text-[#6556CD] ri-arrow-left-line"
          ></i>
          People <small className='text-sm ml-2 text-zinc-600 '>({category})</small>
        </h1>

        <div className="flex items-center w-[80%]">
          <Topnav />
          {/* <DropDown
            title="category"
            options={["on_the_air", "top_rated", "popular","airing_today"]}
            func={(e) => setcategory(e.target.value)}
          /> */}

          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
      dataLength={person.length}
      next={GetPerson}
      hasMore={hasMore}
      loader={<h1>Loading...</h1>}
      >
        <CardOfTrending data={person} title="person"/>
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
}

export default People