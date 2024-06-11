import { axiosClassic, axiosWithAuth } from "../api/interceptors";
import { IAuthor, TypeAuthorForm } from "../types/auth.types";

export const userService = {
  async getAllUsers() {
    const response = await axiosClassic.get<IAuthor[]>("/users");

    return response.data;
  },

  async update(data: TypeAuthorForm) {
    const response = await axiosWithAuth.put("/users/update", data);
    return response.data;
  },
};
