import { useEffect, useState } from "react";
import {
  useGettopmovieQuery,
  useGetallmoviesQuery,
  useGetrandommovieQuery,
} from "../../redux/api/movie.js";
import { useFetchGenresQuery } from "../../redux/api/genre.js";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetallmoviesQuery();
  const { data: topMovies } = useGettopmovieQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetrandommovieQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter((movie) => {
    return movie.genre === selectedGenre
    // console.log(
    //   movie.genre,
    //   selectedGenre,
    //   typeof movie.genre,
    //   typeof selectedGenre
    // ); 
  });

  //onsole.log(filteredMovies);

  return (
    <div className="flex flex-col lg:flex-row  items-center">
      <nav className="ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {genres?.map((g) => (
          <button
            key={g._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${
              selectedGenre === g._id ? "bg-gray-400" : ""
            }`}
            onClick={() => handleGenreClick(g._id)}
          >
            {g.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col mt-[2rem] ml-[2rem]  items-center md:items-start">
        <div className="w-full md:w-[90%] lg:w-[80rem] mb-8">
          <h1 className="mb-5">Choose For you</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full md:w-[90%] lg:w-[80rem] mb-8">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>
        <div className="min-h-[20rem]">
        {filteredMovies ? (
          <div className=" w-full md:w-[90%] lg:w-[80rem] mb-8 ">
            <h1 className="mb-5">Choose Using Genre</h1>
            <SliderUtil data={filteredMovies} />
          </div>
        ) : null}
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
