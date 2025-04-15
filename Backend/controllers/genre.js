import Genre from "../models/Genre.js";

//middleware
import asyncHandler from "../middlewares/asyncHandler.js";

const createGenre = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const existingGenre = await Genre.findOne({ name });
    if (existingGenre) {
      return res.status(401).json({ message: "Genre already exists" });
    }
    const genre = await Genre.create({ name });
    return res.status(200).json(genre);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const removeGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Genre.findByIdAndDelete(id);
    if (!removed) {
      return res.json({ error: "Genre Not Found" });
    }
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const editGenre = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const genre = await Genre.findOne({ _id: id });
    if (!genre) {
      return res.status(400).json({ error: "Genre does not exist" });
    }
    genre.name = name;
    const editedgenre = await genre.save();
    return res.status(200).json(editedgenre);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const listGenre=asyncHandler(async(req,res)=>{
    try {
        const allgenre=await Genre.find({});
        return res.status(200).json(allgenre);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Interval Server Error"})
    }
})

const readGenre=asyncHandler(async(req,res)=>{
    try {
        const genre=await Genre.findOne({_id:req.params.id});
        return res.status(200).json(genre);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Interval Server Error"})
    }
})

export { createGenre, removeGenre, editGenre,listGenre,readGenre };
