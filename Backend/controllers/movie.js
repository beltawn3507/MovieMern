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
  const {data:rawdata} = await axios
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

const fetchspecific=async(req,res)=>{
    const {id} = req.params;
    try {
        const reqmovie=await Movie.findById(id);
        if(!reqmovie){
            res.status(404).json({movie:"Movie Not Found"});
        }
        res.status(200).json(reqmovie);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message})
    }
}

const fetchnewmovies=async(req,res)=>{
    try {
        const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
        res.json(newMovies);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export { fetchAllmovies, createMovies ,fetchspecific,fetchnewmovies};
