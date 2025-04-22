import React, { useEffect } from "react";
import {
  useGetallmoviesQuery,
  useGetnewmovieQuery,
  useGetrandommovieQuery,
  useGettopmovieQuery,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import MoviesCard from "./MoviesCard";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/banner.jpg";

import {
  setMovieYears,
  setFilteredMovies,
  setMovieFilters,
  setUniqueYears,
} from "../../redux/features/movies/movieSlice.js";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetallmoviesQuery();
  const { data: genre } = useFetchGenresQuery();
  const { data: newMovies } = useGetnewmovieQuery();
  const { data: randomMovies } = useGetrandommovieQuery();
  const { data: topMovies } = useGettopmovieQuery();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);
  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    dispatch(setMovieFilters({ searchTerm: e.target.value }));
    const filteredMovies = data.filter((movies) =>
      movies.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filteredMovies);
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genre) => {
    dispatch(setMovieFilters({selectedGenre: genre }));
    const filteredMovies = data.filter((movies) => movies.genre.includes(genre));
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleYearChange = (year) => {
    dispatch(setMovieFilters({ selectedYear: year }))
    const filterByYear = data.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    dispatch(setMovieFilters({ selectedSort:sortOption }));
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
    }
  };

  const handleReset = () => {
    dispatch(setMovieFilters({
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: "",
    }));
    dispatch(setFilteredMovies(data || []));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      <section className="">
        <div
          className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
          <div className="relative z-10 text-center text-white mt-[10rem]">
            <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
            <p className="text-2xl">
              Cinematic Odyssey: Unveiling the Magic of Movies
            </p>
          </div>

          <section className="absolute -bottom-[5rem]">
            <input
              type="text"
              className="w-[100%] h-[5rem] border px-10 outline-none rounded"
              placeholder="Search Movie"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />

            <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
              <select
                className="border p-2 rounded text-white"
                value={moviesFilter.selectedGenre}
                onChange={(e) => handleGenreClick(e.target.value)}
              >
                <option value="">Genres</option>
                {genre?.map((g) => (
                  <option key={g._id} value={g._id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded text-white"
                value={moviesFilter.selectedYear}
                onChange={(e) => handleYearChange(e.target.value)}
              >
                <option value="">Year</option>
                {uniqueYears?.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                className="border p-2 rounded ml-4 text-white"
                value={moviesFilter.selectedSort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="new">New Movies</option>
                <option value="top">Top Movies</option>
                <option value="random">Random Movies</option>
              </select>

              <button
  onClick={handleReset}
  className="ml-4 border p-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
>
  Reset Filters
</button>
            </section>
          </section>
        </div>

        <section className="mt-[3.75rem] w-screen flex justify-center items-center flex-wrap min-h-[80vh] ">
          {filteredMovies && filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <MoviesCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p className="text-white text-2xl font-semibold">
              No movies found 🎬
            </p>
          )}
        </section>
      </section>
    </div>
  );
};

export default AllMovies;
