import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import {
  PaginatedCatalogList,
  Catalog,
  PaginatedItemList,
  Item,
  MainPage,
  Application,
  MainCatalogPart,
  OurWorks,
  Material,
  MaterialsList,
} from './types';

export const api = axios.create({
  baseURL: 'https://laststone.by',
  withCredentials: false,
  // headers: {
  //   'X-CSRFToken': "#6g#m#x)p7315jc#)5ytb)8d74q0!5_h@oyf=h!8$k=+!-jd=i",
  // },
});

const handleApiError = (error: AxiosError): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    console.error('API Error:', error.response?.data);
    return error.response?.data?.message || 'API Error';
  } else {
    // Handle non-Axios errors
    console.error('Unexpected Error:', error);
    return 'Unexpected Error';
  }
};

const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T | undefined> => {
  try {
    const response: AxiosResponse<T> = await api.request<T>(config);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error as AxiosError);
    throw new Error(errorMessage);
  }
};

// API functions

export const getCatalogList = async (page: number = 1): Promise<Catalog | undefined> => {
  return apiRequest<Catalog>({
    url: '/api/catalog/',
    method: 'GET',
    params: { page },
  });
};

export const getCatalogDetails = async (id: number): Promise<Catalog | undefined> => {
  return apiRequest<Catalog>({
    url: `/api/catalog/${id}/`,
    method: 'GET',
  });
};

export const getItemsList = async (page: number = 1): Promise<PaginatedItemList | undefined> => {
  return apiRequest<PaginatedItemList>({
    url: '/api/items/',
    method: 'GET',
    params: { page },
  });
};

export const getItemDetails = async (id: number): Promise<Item | undefined> => {
  return apiRequest<Item>({
    url: `/api/items/${id}/`,
    method: 'GET',
  });
};

export const getMainPageData = async (): Promise<MainPage | undefined> => {
  return apiRequest<MainPage>({
    url: '/api/main/',
    method: 'GET',
  });
};

export const createApplication = async (application: Application): Promise<string | undefined> => {
  return apiRequest<string>({
    url: '/api/main/',
    method: 'POST',
    data: application,
  });
};

export const getMainCatalogList = async (): Promise<MainCatalogPart[] | undefined> => {
  return apiRequest<MainCatalogPart[]>({
    url: '/api/main/catalog/',
    method: 'GET',
  });
};

export const getOurWorksList = async (): Promise<OurWorks[] | undefined> => {
  return apiRequest<OurWorks[]>({
    url: '/api/main/our_works/',
    method: 'GET',
  });
};

export const getMaterialsList = async (page: number = 1): Promise<MaterialsList | undefined> => {
  return apiRequest<MaterialsList>({
    url: '/api/materials/materials/',
    method: 'GET',
    params: { page },
  });
};

export const getMaterialDetails = async (id: number): Promise<Material | undefined> => {
  return apiRequest<Material>({
    url: `/api/materials/materials/${id}/`,
    method: 'GET',
  });
};
