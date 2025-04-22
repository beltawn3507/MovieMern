import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetspecificmovieQuery,
  useAddmoviereviewMutation,
} from "../../redux/api/movie.js";
import MovieTabs from "./MovieTabs.jsx";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { data: movie, refetch } = useGetspecificmovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddmoviereviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ id: movieId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        {/* Go Back Button */}
        <div>
          <Link
            to="/"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
          >
            &larr; Go Back
          </Link>
        </div>

        {/* Movie Poster & Details */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="flex-shrink-0 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <img
              src={movie?.poster}
              alt={movie?.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="flex-1 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-extrabold">
              {movie?.title}
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {movie?.detail}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Release Date:</span>
              <span className="ml-2 text-gray-400">{movie?.year}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Release Date:</span>
              <span className="ml-2 text-gray-400">{movie?.year}</span>
            </p>

          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-inner">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
