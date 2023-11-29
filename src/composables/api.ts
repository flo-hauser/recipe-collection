import axios from "axios";
import { AxiosRequestConfig, Method } from "axios";
import urlJoin from "url-join";
import { useAuthStore } from "@/store/auth";
import { Token } from "@/types/dto/Token";

const apiUrl = import.meta.env.VITE_API_URL;

function useRecipeApi<T>(
  endpoint: string,
  method: Method = "GET",
  data: object | null = null
) {
  const store = useAuthStore();
  endpoint = endpoint.replace(/api\/\d\//, "");
  const url = urlJoin(apiUrl, endpoint);

  const config: AxiosRequestConfig = {
    method,
    url,
    withCredentials: true,
  };

  if (store.loggedIn && store.token?.token) {
    config.headers = {
      Authorization: `Bearer ${store.token.token}`,
    };
  }

  if (data) {
    config.data = data;
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

export { useRecipeApi, useRecipeApiLogin };
