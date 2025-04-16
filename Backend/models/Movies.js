import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema({
  name: {type: String,required: true},
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User",
  }
},{timestamps:true});

const movieSchema=mongoose.Schema({
    title:{type:String , required:true,},
    imdbID: { type: String, required: true, unique: true },
    poster:{type:String},
    year:{type:Number,required:true},
    director:{type:String},
    detail:{type:String,requires:true},
    reviews:[reviewSchema],
    genre:{type:ObjectId,ref:"Genre",required:true},
    numreviews:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now()}
    },{timestamps:true});

const Movie= mongoose.model("Movie",movieSchema);
export default Movie;


