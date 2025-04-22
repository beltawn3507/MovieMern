import { apiSlice } from "./apiSlice.js";
import { MOVIE_URL } from "../constants.js";

export const movieApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getallmovies: builder.query({
      query: () => `${MOVIE_URL}/all-movies`,
    }),

    createmovie: builder.mutation({
      query: ({ imdbid, genre }) => ({
        url: `${MOVIE_URL}/createmovies`,
        method: "POST",
        body: { imdbid, genre },
      }),
    }),

    addmoviereview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `${MOVIE_URL}/${id}/reviews`,
        method: "POST",
        body: { id, rating, comment },
      }),
    }),

    getspecificmovie: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/specific-movie/${id}`,
      }),
    }),

    getnewmovie: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/new-movies`,
      }),
    }),

    gettopmovie: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/top-movies`,
      }),
    }),

    getrandommovie: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/random-movies`,
      }),
    }),
    
    deletemovie:builder.mutation({
        query:(id)=>({
            url:`${MOVIE_URL}/delete-movie/${id}`,
            method:"DELETE",
        })
    }),
    
    deletecomment:builder.mutation({
        query:({movieid,reviewid})=>({
           url:`${MOVIE_URL}/delete-comment`,
           method:"POST",
           body:{movieid,reviewid}
        }),
    }),

  }),
});

export const {
   useGetallmoviesQuery,
   useCreatemovieMutation,
   useAddmoviereviewMutation,
   useGetspecificmovieQuery,
   useGetrandommovieQuery,
   useGettopmovieQuery,
   useGetnewmovieQuery,
   useDeletemovieMutation,
   useDeletecommentMutation,
}=movieApiSlice;
