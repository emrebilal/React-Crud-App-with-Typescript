import {AxiosInstance, AxiosRequestConfig} from "axios";

export function useAxios(axiosInstance: AxiosInstance) {

  function send<T>(httpRequest: AxiosRequestConfig): Promise<T> {

    return new Promise((resolve, reject) => {
      axiosInstance(httpRequest)
        .then((response) => {
          resolve(response.data);
        })
        .catch(async (error) => {
          console.log(error);
          return reject(error);
        });
    });
  }

  return { send };
}
