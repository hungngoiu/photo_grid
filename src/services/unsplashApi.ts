import axios from "axios";
import type { Photo, PhotoDetails, Topic } from "@/types/photo";
import { apiConfig } from "@/configs/apiConfig";
import { appConfig } from "@/configs/appConfig";

export const fetchPhotos = async (page: number): Promise<Photo[]> => {
  const response = await axios.get(`${apiConfig.API_BASE_URL}/photos`, {
    params: {
      client_id: apiConfig.API_KEY,
      page,
      per_page: appConfig.PHOTOS_PER_PAGE
    }
  });
  return response.data;
};

export const fetchPhoto = async (id: string): Promise<PhotoDetails> => {
  const response = await axios.get(`${apiConfig.API_BASE_URL}/photos/${id}`, {
    params: {
      client_id: apiConfig.API_KEY,
    }
  });
  return response.data;
}

export const fetchTopicPhotos = async (topic: Topic, page: number): Promise<Photo[]> => {
  const response = await axios.get(`${apiConfig.API_BASE_URL}/topics/${topic}/photos`, {
    params: {
      client_id: apiConfig.API_KEY,
      page,
      per_page: appConfig.PHOTOS_PER_PAGE
    }
  });
  return response.data;
};

export const searchPhotos = async (searchQuery: string, page: number): Promise<Photo[]> => {
  const response = await axios.get(`${apiConfig.API_BASE_URL}/search/photos`, {
    params: {
      client_id: apiConfig.API_KEY,
      query: searchQuery,
      page,
      per_page: appConfig.PHOTOS_PER_PAGE
    }
  });
  return response.data.results;
}

export const downloadPhoto = async (id: string): Promise<Blob> => {
  const { url } = (await axios.get(`${apiConfig.API_BASE_URL}/photos/${id}/download`, {
    params: {
      client_id: apiConfig.API_KEY
    },
  })).data;
  const response = await axios.get(url, {
    responseType: "blob"
  })
  return response.data;
}