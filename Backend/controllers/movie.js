import Movie from "../models/Movies.js";
import axios from "axios";
import Genre from "../models/Genre.js";

const fetchAllmovies = async (req, res) => {
  try {
    const allmovies = await Movie.find();
    res.json(allmovies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const createMovies = async (req, res) => {
  const { imdbid, genre } = req.body;
  const { data: rawdata } = await axios
    .get("https://omdbapi.com", {
      params: {
        plot: "full",
        apikey: "3e9e4b31",
        i: imdbid,
      },
    })
    .then()
    .catch((error) => console.error("Error fetching movies", error));

  const genreDoc = await Genre.findOne({ name: genre });
  if (!genreDoc) {
    return res.status(404).json({ error: "Genre not found" });
  }

  const existingMovie = await Movie.findOne({ imdbID: imdbid });
  if (existingMovie) {
    return res.status(400).json({ error: "Movie already exists" });
  }
  //   const rawdata=data.data;

  const newMovie = new Movie({
    title: rawdata.Title,
    imdbID: imdbid,
    poster: rawdata.Poster,
    year: parseInt(rawdata.Year),
    director: rawdata.Director,
    detail: rawdata.Plot,
    reviews: [],
    genre: genreDoc._id,
    numreviews: 0,
  });

  try {
    await newMovie.save();
    res.status(200).json(newMovie);
  } catch (error) {
    cconsole.error("Error creating movie:", error);
    res.status(500).json({ error: error.message });
  }
};

const fetchspecific = async (req, res) => {
  const { id } = req.params;
  try {
    const reqmovie = await Movie.findById(id);
    if (!reqmovie) {
      res.status(404).json({ movie: "Movie Not Found" });
    }
    res.status(200).json(reqmovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const fetchnewmovies = async (req, res) => {
  try {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(newMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchtopmovies = async (req, res) => {
  try {
    const topmovies = await Movie.find().sort({ numreviews: -1 }).limit(10);
    res.json(topmovies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const fecthrandommovies = async (req, res) => {
  try {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(randomMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedmovie = await Movie.findByIdAndDelete(id);
    res.status(200).json(deletedmovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const movieReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Movie already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numreviews = movie.reviews.length ;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review Added" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// const updateMovies=async(req,res)=>{
// }

const deleteComment = async (req, res) => {
  try {
    const { movieid, reviewid } = req.body;
    const movie = await Movie.findById(movieid);
    if (!movie) {
      return res.status(404).json({ movieid,reviewid});
    }
    const reviewIndex = movie.reviews.findIndex(
      (r) => r._id.toString() === reviewid
    );
    console.log(reviewIndex);

    if (reviewIndex === -1) {
      return res.status(400).json({ message: "Comment not found" });
    }

    movie.reviews.splice(reviewIndex, 1);
    movie.numreviews = movie.reviews.length ;
    movie.rating =
      movie.reviews.length > 0
        ? movie.review.reduce((acc, item) => item.rating + acc, 0) /
          movie.numreviews
        : 0;
    await movie.save();
    res.json({ message: "comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error deleting comment" });
  }
};

export {
  fetchAllmovies,
  createMovies,
  fetchspecific,
  fetchnewmovies,
  fetchtopmovies,
  fecthrandommovies,
  deleteMovies,
  movieReview,
  // updateMovies,
  deleteComment,
};
