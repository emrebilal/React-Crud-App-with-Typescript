import { useAxios } from "./Axios";
import axios, { AxiosRequestConfig } from "axios";

import { IAddUserModel, IGetUsersResponseModel } from "./models";

interface ICrudService {
  getUsers: () => Promise<Array<IGetUsersResponseModel>>;
  getUser: (id: string) => Promise<IGetUsersResponseModel>;
  addUser: (model: IAddUserModel) => Promise<boolean>;
  deleteUser: (id: number) => Promise<boolean>;
  updateUser: (model: IAddUserModel, id: string) => Promise<boolean>;
}

export function CrudService(): ICrudService {

  const axiosService = useAxios(
    axios.create({
      baseURL: "http://localhost:3004",
      headers: { "Content-type": "application/json" }
    })
  );

  const getUsers = (): Promise<Array<IGetUsersResponseModel>> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "/users"
    };

    return axiosService.send<Array<IGetUsersResponseModel>>(config);
  };

  const getUser = (id: string): Promise<IGetUsersResponseModel> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `/users/${id}`
    };

    return axiosService.send<IGetUsersResponseModel>(config);
  };

  const addUser = (model: IAddUserModel): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `/users`,
      data: model
    };

    return axiosService.send<boolean>(config);
  };

  const deleteUser = (id: number): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `/users/${id}`
    };

    return axiosService.send<boolean>(config);
  };

  const updateUser = (model: IAddUserModel, id: string): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "put",
      url: `/users/${id}`,
      data: model
    };

    return axiosService.send<boolean>(config);
  };

  const value: ICrudService = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser
  };

  return value;
}
