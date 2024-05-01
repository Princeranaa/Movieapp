import axios from "../../utils/axios";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import noimage from "/noimage.jpg"

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);

  const getSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // console.log(data);
      setsearches(data.results);
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className="w-[80%] h-[10vh] relative flex mx-auto items-center ">
      <i className=" text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="w-[50%] text-zinc-300 mx-10 p-5 tex-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />

      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className=" text-zinc-400 text-3xl ri-close-line right-0"
        ></i>
      )}

      <div className=" z-[100] absolute w-[50%] max-h-[50vh] bg-zinc-300 top-[100%] left-[4%] overflow-auto ">
        {searches.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[10vh] h-[10vh] object-cover rounded mr-4 shadow-lg"
              src={  s.backdrop_path || s.profile_path ?
                `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }` : noimage 
            }
              alt=""
            />
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}

        {/*  */}
      </div>
    </div>
  );
}

export default Topnav;
