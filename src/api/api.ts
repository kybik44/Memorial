import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  Application,
  Catalog,
  Item,
  ItemsListParams,
  MainCatalogPart,
  MainPage,
  Material,
  MaterialsList,
  OurWorks,
  PaginatedCatalogList,
  PaginatedItemList,
} from "./types";

export const api = axios.create({
  baseURL: "https://laststone.by/",
  withCredentials: false,
  // headers: {
  //   'X-CSRFToken': "#6g#m#x)p7315jc#)5ytb)8d74q0!5_h@oyf=h!8$k=+!-jd=i",
  // },
});

const handleApiError = (error: AxiosError): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    console.error("API Error:", error.response?.data);
    return error.response?.data?.message || "API Error";
  } else {
    // Handle non-Axios errors
    console.error("Unexpected Error:", error);
    return "Unexpected Error";
  }
};

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 минут

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T | undefined> => {
  const cacheKey = `${config.method}-${config.url}-${JSON.stringify(config.params)}`;
  const cachedData = getCachedData(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api(config);
    setCachedData(cacheKey, response.data);
    return response.data;
  } catch (error) {
    const errorMessage = handleApiError(error as AxiosError);
    throw new Error(errorMessage);
  }
};

export const getCatalogList = async (
  page: number = 1
): Promise<PaginatedCatalogList | undefined> => {
  return apiRequest<PaginatedCatalogList>({
    url: "/api/catalog/",
    method: "GET",
    params: { page },
  });
};

export const getCatalogDetails = async (
  slug: string
): Promise<Catalog | undefined> => {
  return apiRequest<Catalog>({
    url: `/api/catalog/${slug}/`,
    method: "GET",
  });
};

export const getItemsList = async (
  params: ItemsListParams = {}
): Promise<PaginatedItemList | undefined> => {
  // Преобразуем параметры для правильного запроса к API
  const apiParams = {
    page: params.page || 1,
    ordering: params.ordering || "title",
    ...(params.category && { category: params.category }),
    ...(params.search && { search: params.search }),
    ...(params.price_gte && { price_gte: params.price_gte }),
    ...(params.price_lte && { price_lte: params.price_lte }),
    ...(params.slug && { slug: params.slug }), // slug используется для фильтрации по категории
    ...(params.title && { title: params.title }),
  };

  return apiRequest<PaginatedItemList>({
    url: "/api/items/",
    method: "GET",
    params: apiParams,
  });
};

export const getItemDetails = async (id: number): Promise<Item | undefined> => {
  return apiRequest<Item>({
    url: `/api/items/${id}/`,
    method: "GET",
  });
};

export const getMainPageData = async (): Promise<MainPage | undefined> => {
  return apiRequest<MainPage>({
    url: "/api/main/",
    method: "GET",
  });
};

export const createApplication = async (
  application: Application
): Promise<string | undefined> => {
  return apiRequest<string>({
    url: "/api/main/",
    method: "POST",
    data: application,
  });
};

export const getMainCatalogList = async (): Promise<
  MainCatalogPart[] | undefined
> => {
  return apiRequest<MainCatalogPart[]>({
    url: "/api/main/catalog/",
    method: "GET",
  });
};

export const getOurWorksList = async (): Promise<OurWorks[] | undefined> => {
  return apiRequest<OurWorks[]>({
    url: "/api/main/our_works/",
    method: "GET",
  });
};

export const getMaterialsList = async (
  page: number = 1
): Promise<MaterialsList | undefined> => {
  return apiRequest<MaterialsList>({
    url: "/api/materials/materials/",
    method: "GET",
    params: { page },
  });
};

export const getMaterialDetails = async (
  id: number
): Promise<Material | undefined> => {
  return apiRequest<Material>({
    url: `/api/materials/materials/${id}/`,
    method: "GET",
  });
};
