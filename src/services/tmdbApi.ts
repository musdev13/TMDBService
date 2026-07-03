import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = axios.create({
    baseURL : 'https://api.themoviedb.org/3',
    headers : {
        accept : "application/json",
        authorization : `Bearer ${ACCESS_TOKEN}`
    },
    params : {
        language : "uk-UA", 
    }
})


export const getPopularMovies = async (page = 1) => {
    const response = await tmdbApi.get("/movie/popular",{
        params : {
            page
        }
        
    })
    return response.data;
}

// https://api.themoviedb.org/3/movie/popular?language=uk-UA&page=1