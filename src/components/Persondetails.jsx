import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personAction";
import { Link,useLocation,useNavigate,useParams,} 
from "react-router-dom";
import Loader from "./templates/Loader";
import HoriizontalCards from "./templates/HoriizontalCards";
import DropDown from "./templates/DropDown";

function Persondetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [category, setcategory] = useState("movie");
  const { info } = useSelector((state) => state.person);
  // console.log(info);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] h-[200vh] w-screen bg-[#1F1E24]">
      {/* part 1 Navigation */}
      <nav className="w-full h-[10vh]  text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="mr-2 ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex">
        {/* part 2 left poster and details*/}
        <div className="w-[20%]">
          <img
            className="h-[35vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              info.detail.profile_path || info.detail.backdrop_path
            }`}
            alt=""
          />
          <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />

          {/* Social media Links */}

          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>

          <h1 className="text-2xl text-zinc-400 font-semibold my-5">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">Known for</h1>
          <h1 className="text-zinc-400 ">{info.detail.known_for_department}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-zinc-400 ">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Birthday</h1>
          <h1 className="text-zinc-400 ">{info.detail.birthday}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-zinc-400 ">
            {info.detail.deathday ? info.detail.deathday : "Still ALive"}
          </h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place of Birth
          </h1>
          <h1 className="text-zinc-400 ">{info.detail.place_of_birth}</h1>

          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Also Known as
          </h1>
          <h1 className="text-zinc-400 ">
            {info.detail.also_known_as.join(", ")}
          </h1>
        </div>

        {/* Part 3 right details and informaton  */}
        <div className="w-[80%] ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-black my-5">
            {info.detail.name}
          </h1>
          <h1 className="text-xl text-zinc-400 font-semibold">Biography</h1>
          <h1 className="text-zinc-400 mt-3">{info.detail.biography}</h1>

          <h1 className="text-lg mt-5 text-zinc-400 font-semibold">
            Known for
          </h1>
          <HoriizontalCards data={info.combinedCredits.cast} />

          <div className="w-full flex justify-between">
            <h1 className="text-xl mt-4 text-zinc-400 font-semibold">Acting</h1>
            <DropDown
              title="category"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>

          <div className="w-full h-[50vh] mt-5 list-disc text-zinc-400 overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 p-5  ">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white rounded hover:bg-[#19191d] duration-300 cursor-pointer">
                <Link to={`/${category}/details.${c.id}`} className="">

              <span >
                    {c.name ||
                     c.title ||
                     c.original_name ||
                     c.original_title}
              </span>

                  <span className="block mt-2 ml-5">
                    {c.character && `Character Name : ${c.character}`}

                  
                  </span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default Persondetails;
