import axios, { AxiosRequestConfig, Method } from "axios";
import urlJoin from "url-join";
import { useAuthStore } from "@/store/auth";
import { Token } from "@/types/dto/Token";

const apiUrl = import.meta.env.VITE_API_URL;
const apiHost = import.meta.env.VITE_API_HOST;

function useRecipeApi<T>(
  endpoint: string,
  method: Method = "GET",
  data: object | null = null,
  params: object | null = null
) {
  const store = useAuthStore();
  endpoint = endpoint.replace(/api\/\d\//, "");
  const url = urlJoin(apiUrl, endpoint);

  const config: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  };

  if (store.loggedIn && store.token?.token && config.headers) {
    config.headers.Authorization = `Bearer ${store.token.token}`;
  }

  if (data) {
    config.data = data;
  }

  if (params) {
    config.params = params;
  }

  return axios<T>(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(`failed api request on ${endpoint}`);
      throw err;
    });
}

function useRecipeApiLogin(username: string, password: string) {
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    Accept: "application/json",
  };

  return axios
    .get<Token>(urlJoin(apiUrl, "tokens"), {
      headers,
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      throw err;
    });
}

function useRecipeApiUpload<T>(
  endpoint: string,
  method: Method = "PUT",
  data: FormData
) {
  const store = useAuthStore();
  endpoint = endpoint.replace(/api\/\d\//, "");
  const url = urlJoin(apiUrl, endpoint);

  const config: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  };

  if (store.loggedIn && store.token?.token && config.headers) {
    config.headers.Authorization = `Bearer ${store.token.token}`;
  }

  config.data = data;

  return axios<T>(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.warn(err);
      throw err;
    });
}

export { useRecipeApi, useRecipeApiLogin, useRecipeApiUpload, apiUrl, apiHost };
