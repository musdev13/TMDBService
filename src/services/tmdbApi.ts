import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  params: {
    language: "uk-UA",
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdbApi.get("/movie/popular", {
    params: {
      page,
    },
  });
  return response.data;
};

// https://api.themoviedb.org/3/movie/popular?language=uk-UA&page=1

export const searchMovies = async (query: string, page = 1) => {
  const response = await tmdbApi.get("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: number) => {
  const response = await tmdbApi.get(`/movie/${movieId}`, {
    params: {
      append_to_response: "credits,videos",
    },
  });
  return response.data;
};

export const getPersonDetails = async (personId: number) => {
  const response = await tmdbApi.get(`/person/${personId}`);
  return response.data;
};

export const getRequestToken = async () => {
  const response = await tmdbApi.get("/authentication/token/new");
  return response.data.request_token;
};

export const validateTokenWithLogin = async (
  username: string,
  password: string,
  requestToken: string,
) => {
  const response = await tmdbApi.post(
    "/authentication/token/validate_with_login",
    {
      username,
      password,
      request_token: requestToken,
    },
  );
  return response.data.request_token;
};

export const createSessionId = async (requestToken: string) => {
  const response = await tmdbApi.post("/authentication/session/new", {
    request_token: requestToken,
  });
  return response.data.session_id;
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<string> => {
  const requestToken = await getRequestToken();
  const validatedToken = await validateTokenWithLogin(
    username,
    password,
    requestToken,
  );
  const sessionId = await createSessionId(validatedToken);
  return sessionId;
};
