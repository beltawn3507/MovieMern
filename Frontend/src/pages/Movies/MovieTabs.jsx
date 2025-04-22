import { useState } from "react";
import { Link } from "react-router-dom";

const MovieTabs = ({ userInfo, submitHandler, comment, setComment, movie,rating,setRating }) => {
  //const [rating, setRating] = useState(0);

  const onRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Review Form */}
      <section className="bg-gray-900 p-6 rounded-xl shadow-md">
        {userInfo ? (
          <form onSubmit={(e) => submitHandler(e)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Write Your Review</h2>

            {/* Rating Input */}
            <div>
              <label className="block text-white mb-2">Your Rating:</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      checked={rating === star}
                      onChange={onRatingChange}
                      className="hidden"
                    />
                    <svg
                      className={`w-6 h-6 ${rating >= star ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.383 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.922-.755 1.688-1.54 1.118L10 13.348l-3.382 2.455c-.784.57-1.838-.196-1.539-1.118l1.285-3.967a1 1 0 00-.364-1.118L2.617 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment Textarea */}
            <div>
              <label htmlFor="comment" className="block text-white mb-2">
                Your Comment
              </label>
              <textarea
                id="comment"
                rows="4"
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={comment.trim() === ''}
              className="bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Submit Review
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-white mb-4">Please sign in to write a review</p>
            <Link
              to="/login"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Reviews List */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-white">Reviews</h3>
        {movie?.reviews?.length === 0 ? (
          <p className="text-gray-400">No Reviews Yet</p>
        ) : (
          <div className="space-y-6">
            {movie?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 p-5 rounded-xl shadow-inner"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal-400 font-medium">{review.name}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.383 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.922-.755 1.688-1.54 1.118L10 13.348l-3.382 2.455c-.784.57-1.838-.196-1.539-1.118l1.285-3.967a1 1 0 00-.364-1.118L2.617 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-200">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      
    </div>
  );
};

export default MovieTabs;


