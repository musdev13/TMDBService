import { tmdbClient } from "@/shared/api";

export const getRequestToken = async () => {
  const response = await tmdbClient.get("/authentication/token/new");
  return response.data.request_token;
};

export const validateTokenWithLogin = async (
  username: string,
  password: string,
  requestToken: string,
) => {
  const response = await tmdbClient.post(
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
  const response = await tmdbClient.post("/authentication/session/new", {
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