import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieAction";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/Loader";
import HoriizontalCards from "./templates/HoriizontalCards";

const Moviedetails = () => {
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  console.log(info);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)),
    url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" relative w-screen h-[200vh] px-[10%]"
    >
      {/* part 1 Navigation */}

      <nav className="w-full h-[10vh] text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="mr-2 ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/*part-2 poster and details*/}

      <div className="w-full flex ">
        <img
          className="h-[50vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white ">
          <h1 className="text-5xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
            <span className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>

          <div className="flex mt-5 mb-5 text-zinc-100 items-center gap-x-3 ">
            <span className="rounded-full text-center text-xl font-semibold bg-yellow-600 text-white w-[6vh] h-[6vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>
            <h1 className=" w-[10%] font-semibld text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className="text-2xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className="text-2xl mb-3 mt-5"> Movie Translated</h1>
          <p className="mb-10">{info.translations.join(", ")}</p>
          
          <Link className=" p-5 bg-[#6556CD] rounded-lg" to={`${pathname}/trailer`}>
          <i className="text-xl mr-3  ri-play-fill"></i>
            Play Trailer</Link>

        </div>
      </div>
      {/*part-3 Available Platforms */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10 ">
        {/* <div className="mt-5"> */}

        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w,i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.i} // Add a unique key for each img element
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w,i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.i} // Add a unique key for each img element
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Buy</h1>
            {info.watchproviders.buy.map((w,i) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={w.i} // Add a unique key for each img element
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
        {/* </div> */}
      </div>
      
      {/* Part 4 Recommendation and Similar stuff */}
         <hr className="mt-5 mb-5 border-none h-[2px] bg-zinc-500" />

         <h1 className="text-3xl  font-bold text-white">
          Recommendations & Smilar Stuff
         </h1>
         <HoriizontalCards data={info.recommendations.length> 0 ? 
          info.recommendations 
          : info.similar
          }
        />
        <Outlet/>
            
    </div>
  ) : (
    <Loader />
  );
};

export default Moviedetails;
