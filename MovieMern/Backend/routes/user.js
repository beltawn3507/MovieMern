import express from "express";

//controllers will be imported here
import { createUser, loginUser,logoutUser ,getAllusers,getCurrentUserProfile,editcurrentUser} from "../controllers/user.js";
//middleware will be imported here
import { authenticate,authorizeAdmin } from "../middlewares/authmiddleware.js";

const router = express.Router();

router.route("/").post(createUser).get(authenticate,authorizeAdmin,getAllusers);
router.route("/auth").post(loginUser);
router.post("/logout",logoutUser);
router.route("/profile").get(authenticate,getCurrentUserProfile).put(authenticate,editcurrentUser);

export default router;
