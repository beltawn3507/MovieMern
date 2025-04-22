import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatemovieMutation } from "../../redux/api/movie";
import { toast } from "react-toastify";
import { useFetchGenresQuery } from "../../redux/api/genre";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [imdbid, setImdbid] = useState("");
  const [genre, setGenre] = useState("");

  const { data: genres = [], isLoading: isLoadingGenres } = useFetchGenresQuery();
  const [createMovie, { isLoading: isCreatingMovie }] = useCreatemovieMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imdbid.trim() || !genre) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      await createMovie({ imdbid: imdbid.trim(), genre }).unwrap();
      toast.success("Movie added to database");
      navigate("/admin/movies-list");
    } catch (error) {
      const errorMessage = error?.data?.error || error.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <p className="text-green-200 text-xl sm:text-2xl mb-6 sm:mb-4 text-center">
          Create Movie
        </p>

        <div className="mb-6">
          <label htmlFor="imdbid" className="block text-green-200 font-medium mb-2">
            IMDB ID
          </label>
          <input
            id="imdbid"
            type="text"
            value={imdbid}
            onChange={(e) => setImdbid(e.target.value)}
            className="w-full border border-teal-500 rounded-lg px-3 py-2 sm:px-2 sm:py-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="e.g. tt1234567"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="genre" className="block text-green-200 font-medium mb-2">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full border border-teal-500 rounded-lg px-3 py-2 sm:px-2 sm:py-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="" disabled>
              {isLoadingGenres ? "Loading genres..." : "Select an option"}
            </option>
            {genres.map((g) => (
              <option key={g._id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isCreatingMovie}
          className="w-full bg-teal-500 hover:bg-teal-600 focus:bg-teal-600 text-white font-medium rounded-lg px-4 py-2 sm:py-3 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreatingMovie ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;