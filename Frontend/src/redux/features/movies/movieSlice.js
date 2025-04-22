import { createSlice } from "@reduxjs/toolkit";

const initialState={
     moviesFilter:{
        searchTerm:"",
        selectedGenre:"",
        selectedYear:"",
        selectedSort:"",
     },
     filteredMovies: [],
     movieYears: [],
     uniqueYear: [],
};

const movieSlice=createSlice({
    name:"movie",
    initialState,
    reducers:{
        setMovieFilters:(state,action)=>{
            state.moviesFilter={...state.moviesFilter,...action.payload};
        },
        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload;
        },
        setMovieYears:(state,action)=>{
            state.movieYears=action.payload;
        },
        setUniqueYears: (state, action) => {
            state.uniqueYear = action.payload;
          },
    }
})

export const{
    setMovieFilters,setFilteredMovies,setUniqueYears,setMovieYears
}=movieSlice.actions;

export default movieSlice.reducer;

