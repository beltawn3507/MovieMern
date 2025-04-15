import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/createToken.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
   return res.status(400).json({message:"Please Enter all fields"});
  }
  const existinguser = await User.findOne({ email });
  if (existinguser) {
    return res.status(400).json({message:"User already exist"});
  }
  //hashing the users password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    generateToken(res, user._id);
   return  res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    return res.status(400).json({message:"Invalid User data"});
    
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Please fill all the fields");
  }

  const existinguser = await User.findOne({ email });

  if (existinguser) {
    const ispasswordvalid = await bcrypt.compare(
      password,
      existinguser.password
    );

    if (ispasswordvalid) {
      generateToken(res, existinguser._id);
      return res.status(200).json({
        _id: existinguser._id,
        username: existinguser.username,
        email: existinguser.email,
        isAdmin: existinguser.isAdmin,
      });
    } else {
      return res.status(401).json({ message: "Invlaid password" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.status(201).json({ message: "Logout Successfully" });
});

const getAllusers = asyncHandler(async (req, res) => {
  const user = await User.find({});
  return res.status(200).json(user);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
   return  res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
   return res.status(400).json({ message: "User not found" });
  }
});

const editcurrentUser=asyncHandler(async(req,res)=>{
  const user=await User.findById(req.user._id);
  if(user){
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if(req.body.password){
      const salt=await bcrypt.genSalt(10);
      const hashedpassword=await bcrypt.hash(req.body.password,salt);
      user.password=hashedpassword;
    }
    const updatedUser = await user.save();
   return  res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

  }else{
    return res.status(400).json({message:"Invalid user"});
  }
})

export {
  createUser,
  loginUser,
  logoutUser,
  getAllusers,
  getCurrentUserProfile,
  editcurrentUser
};
