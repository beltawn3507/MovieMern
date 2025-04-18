import express from 'express';
const router=express.Router();

import {createMovies,fetchAllmovies,fetchspecific,fetchnewmovies,fetchtopmovies,fecthrandommovies,deleteMovies,movieReview,
    //,updateMovies
    deleteComment,
} from "../controllers/movie.js"
//middleware
import { authenticate,authorizeAdmin } from '../middlewares/authmiddleware.js';
import checkId from '../middlewares/checkId.js';


//routes without logging in
router.get("/all-movies",fetchAllmovies);
router.get("/specific-movie/:id",fetchspecific);
router.get("/new-movies",fetchnewmovies);
router.get("/top-movies",fetchtopmovies);
router.get("/random-movies",fecthrandommovies);

//routes with normal user
router.post("/:id/reviews",authenticate,checkId,movieReview)
//routes with admin only

router.route("/createmovies").post(authenticate,authorizeAdmin,createMovies)
//router.route("/update-movie/:id").put(authenticate,authorizeAdmin,updateMovies);
router.delete("/delete-movie/:id",authenticate,authorizeAdmin,deleteMovies);
router.delete("/delete-comment",authenticate,authorizeAdmin,deleteComment);


export default router;