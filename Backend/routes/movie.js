import express from 'express';
const router=express.Router();

import {createMovies,fetchAllmovies,fetchspecific,fetchnewmovies} from "../controllers/movie.js"
//middleware
import { authenticate,authorizeAdmin } from '../middlewares/authmiddleware.js';


//routes without loggingin
router.get("/all-movies",fetchAllmovies);
router.get("/specific-movie/:id",fetchspecific);
router.get("/new-movies",fetchnewmovies);
// router.get("top-movies",fetchtopmovies);
// router.get("random-movies",fecthrandommovies);

//routes with normal user
router.route("/admin/createmovies").get(authenticate,authorizeAdmin,createMovies,)

//routes with admin only


export default router;