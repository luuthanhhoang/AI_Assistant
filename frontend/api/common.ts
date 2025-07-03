import axios from "axios";
export const API_URL = "http://localhost:8000";
export const DEFAULT_LIMIT = 20;

const config = {
  baseURL: "http://localhost:8000",
};

const configWithBearer = Object.assign({}, config, {
  headers: {
    // Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

export interface Response<T> {
  data: T | null | undefined;
  status: number;
  isError: boolean;
  errorMessage: string;
}

const requestMap = new Map<string, Promise<Response<any>>>();

export async function apiGet<R>(
  url: string,
  converter?: (data: any) => R
): Promise<Response<R>> {
  if (requestMap.has(url)) {
    return requestMap.get(url)!;
  }
  const requestPromise = axios
    .get(url, configWithBearer)
    .then((response) => {
      requestMap.delete(url);
      if (response.status === 200) {
        return {
          data: converter ? converter(response.data) : response.data,
          status: response.status,
          isError: false,
          errorMessage: "",
        };
      }
      return {
        data: null,
        status: response.status,
        isError: true,
        errorMessage: response.statusText,
      };
    })
    .catch((error) => {
      requestMap.delete(url);
      return {
        data: null,
        status: -1,
        isError: true,
        errorMessage: error.message,
      };
    });
  requestMap.set(url, requestPromise);
  return requestPromise;
}

export async function apiPost<R, D>(
  url: string,
  data: D,
  converterR?: (data: any) => R,
  converterD?: (data: any) => D
): Promise<Response<R>> {
  const postPromise = axios
    .post(url, converterD ? converterD(data) : data, configWithBearer)
    .then((response) => {
      if (response.status === 200) {
        return {
          data: converterR ? converterR(response.data) : response.data,
          status: response.status,
          isError: false,
          errorMessage: "",
        };
      }
      return {
        data: null,
        status: response.status,
        isError: true,
        errorMessage: response.statusText,
      };
    })
    .catch((error) => {
      return {
        data: null,
        status: -1,
        isError: true,
        errorMessage: error.message,
      };
    });
  return postPromise;
}

export async function apiPut<R, D>(
  url: string,
  data: D,
  converterR?: (data: any) => R,
  converterD?: (data: any) => D
): Promise<Response<R>> {
  const putPromise = axios
    .put(url, converterD ? converterD(data) : data, configWithBearer)
    .then((response) => {
      if (response.status === 200) {
        return {
          data: converterR ? converterR(response.data) : response.data,
          status: response.status,
          isError: false,
          errorMessage: "",
        };
      }
      return {
        data: null,
        status: response.status,
        isError: true,
        errorMessage: response.statusText,
      };
    })
    .catch((error) => {
      return {
        data: null,
        status: -1,
        isError: true,
        errorMessage: error.message,
      };
    });
  return putPromise;
}

export async function apiDelete<R>(
  url: string,
  data?: any
): Promise<Response<R>> {
  const deletePromise = axios
    .delete(url, { ...configWithBearer, data })
    .then((response) => {
      if (response.status === 200) {
        return {
          data: response.data,
          status: response.status,
          isError: false,
          errorMessage: "",
        };
      }
      return {
        data: null,
        status: response.status,
        isError: true,
        errorMessage: response.statusText,
      };
    })
    .catch((error) => {
      return {
        data: null,
        status: -1,
        isError: true,
        errorMessage: error.message,
      };
    });
  return deletePromise;
}
