import React from "react";
import { Link } from "react-router-dom";
import {
  useDeletemovieMutation,
  useGetallmoviesQuery,
} from "../../redux/api/movie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const { data: movies } = useGetallmoviesQuery();
  const navigate = useNavigate();
  const [deletemovie] = useDeletemovieMutation();

  const handleDelete = (movie) => {
    // console.log(movie);
    try {
      deletemovie(movie).unwrap();
      toast.success("Movie successfully deleted");
      navigate(0);
    } catch (error) {
      toast.error("Failed to delete movie ");
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="py-8">
        <h1 className="text-2xl font-bold mb-6">
          All Movies ({movies?.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.map((movie) => (
            <div
              key={movie._id}
              className="bg-blue rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <Link to={`/admin/movies/update/${movie._id}`}>
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-56 sm:h-64 md:h-72 lg:h-80 object-cover "
                />
              </Link>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-yellow-800">
                  {movie.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {movie.detail}
                </p>
                <Link
                  to={`/admin/movies/update/${movie._id}`}
                  className="inline-block bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update Movie
                </Link>
                <button
                  type="button"
                  className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDelete(movie._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
