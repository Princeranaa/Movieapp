import React from 'react'
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player"
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import Notfound from '././Notfound';

function Trailer() {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const category = pathname.includes("movie") ? "movie" :"tv";
    const youVideo = useSelector((state)=> state[category].info.videos);

  return  (
    <div className='absolute top-0 left-0 z-[100] bg-[rgba(0,0,0,.9)] w-screen h-screen flex items-center justify-center'>
       
         <Link
          onClick={() => navigate(-1)}
          className=" absolute ri-close-fill text-3xl text-white top-[5%] right-[3%]"
        ></Link>
        
        {youVideo ? (
          <ReactPlayer
          controls
           height={600}
           width={1400}
           url={`https://www.youtube.com/watch?v=${youVideo.key}`}/>  

        ):(<Notfound/>)
      };  
    </div>
  ) 
}

export default Trailer