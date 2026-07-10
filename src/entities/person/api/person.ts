import { tmdbClient } from "@/shared/api";

export const getPersonDetails = async (personId: number) => {
  const response = await tmdbClient.get(`/person/${personId}`);
  return response.data;
};