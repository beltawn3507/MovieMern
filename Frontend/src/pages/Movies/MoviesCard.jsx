import { Link } from "react-router"


const MoviesCard = ({movie}) => {
   // console.log(movie.title)
  return (
    <div key={movie._id} className="relative group m-[2rem]">
       <Link to={`movies/${movie._id}`}>
       <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto max-w-[20rem] aspect-[3/4] rounded m-0 p-0 transition duration-300 ease-in-out transform group-hover:opacity-50"
        />
       </Link>

       <p className="absolute text-sm sm:text-base md:text-lg font-semibold top-[85%] left-[1rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 text-white">
        {movie.title}
      </p>
    </div>
  )
}

export default MoviesCard
