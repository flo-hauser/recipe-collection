import axios from "axios";
import { AxiosRequestConfig, Method } from "axios";
import urlJoin from "url-join";
import { useAuthStore } from "@/store/auth";
import { Token } from "@/types/dto/Token";

const apiUrl = import.meta.env.VITE_API_URL;

async function useRecipeApi<T>(
  endpoint: string,
  method: Method = "GET",
  data: object | null = null
) {
  const store = useAuthStore();
  const url = urlJoin(apiUrl, endpoint);

  const config: AxiosRequestConfig = {
    method,
    url,
  };

  if (store.loggedIn && store.token?.token) {
    config.headers = {
      Authorization: `Bearer ${store.token.token}`,
    };
  }

  if (data) {
    config.data = data;
  }

  const response = await axios<T>(config);
  return response.data;
}

function useRecipeApiLogin(username: string, password: string) {
  const headers = {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
  };

  return axios
    .get<Token>(urlJoin(apiUrl, "tokens"), {
      headers,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

export { useRecipeApi, useRecipeApiLogin };
