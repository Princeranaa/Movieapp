import { createSlice } from '@reduxjs/toolkit'

 const initialState = {
    info : null,
  };

  export const MovieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {

        loadmovie: (state,action)=>{
            state.info = action.payload;
        },

        removemovie : (state,action)=>{
            state.info = null;
        }
    }
  });
  
  // Action creators are generated for each case reducer function
  export const { loadmovie, removemovie, incrementByAmount } = MovieSlice.actions
  
  export default MovieSlice.reducer