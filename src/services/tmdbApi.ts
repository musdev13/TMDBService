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
