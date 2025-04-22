import React, { useState,useEffect } from "react";
import {
  useGetallmoviesQuery,
  useDeletecommentMutation,
} from "../../redux/api/movie.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AllComment = () => {
  
  const { data: movies } = useGetallmoviesQuery();
  const [deletecomment, { isLoading }] = useDeletecommentMutation();
  const [comments,setComments]=useState([{}]);
  
  useEffect(() => {
    if (movies) {
      const tempcomments = [];

      movies.forEach((movie) => {
        movie?.reviews?.forEach((rev) => {
          const commentspayload = {
            title: movie.title,
            name: rev.name,
            comment: rev.comment,
            movid: movie._id,
            revid: rev._id,
            date: rev.createdAt?.substring(0, 10),
          };
          tempcomments.push(commentspayload);
        });
      });

      setComments(tempcomments);
    }
  }, [movies]);

  //console.log(comments)

  const handleDelete=async(movid,revid)=>{
     try{ 
      console.log(typeof(movid),typeof(revid));
        const res=await deletecomment({movieid:movid,reviewid:revid}).unwrap();
        console.log("response",res);

        toast.success("Comment deleted");
        setComments((prev)=>prev.filter((comm)=>comm.revid !== revid)) ;
     }catch(error){
       console.log(error);
       toast.error("Comment deletion failed")
     }
     
  }


  //console.log(movies);
  return (
    <div>
      <div className="flex justify-center align-items">
       <strong> <h1 className="text-4xl text-amber-400 mt-10">All comments</h1></strong>
      </div>
      {comments?.map((com) => (
        <section
          key={com.movid}
          className="flex flex-col items-center justify-center"
        >
          
            <div
              key={com.revid}
              className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">
                  {com.title}
                  <br />
                  {com.name}
                </strong>
                <p>{com.date}</p>
              </div>

              <p className="my-4">{com.comment}</p>

              <button className="text-red-600"
              onClick={()=>handleDelete(com.movid,com.revid)}
              >
                Delete
              </button>
            </div>

            
        
        </section>
      ))}
    </div>
  );
};

export default AllComment;
