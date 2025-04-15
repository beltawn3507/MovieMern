import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();
import path from "path"
import userRoutes from './routes/user.js'
import genreRoutes from "./routes/genre.js"
//files
import connectDB  from "./config/db.js"


//configuarations
connectDB();

const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const PORT=process.env.PORT||3000;

//routes


app.use("/api/v1/users",userRoutes);
app.use("/api/v1/genre",genreRoutes);


app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`);
})



