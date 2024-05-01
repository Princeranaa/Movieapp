export {removemovie} from "../reducers/MovieSlice"
import axios from "../../utils/axios";
import  {loadmovie} from "../reducers/MovieSlice"

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);

    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      translations : translations.data.translations.map((t)=>t.name),
      videos: videos.data.results.find((m)=> m.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };

    // console.log(theultimatedetails);

    // Dispatch the action to update the Redux store with the loaded movie details
    dispatch(loadmovie(theultimatedetails)); 
  } catch (error) {
    // console.log("Error fetching movie details:", error); 
    console.log(error);
  }
};
