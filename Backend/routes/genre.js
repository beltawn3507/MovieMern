import express from 'express';
const router=express.Router();

//controllers
import {createGenre,removeGenre,editGenre,listGenre,readGenre} from "../controllers/genre.js"

//middleware
import {authenticate,authorizeAdmin} from "../middlewares/authmiddleware.js"



router.route("/").post(authenticate,authorizeAdmin,createGenre);
router.route("/:id").put(authenticate,authorizeAdmin,editGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, removeGenre);
router.route("/genres").get(listGenre);
router.route("/:id").get(readGenre);


export default router