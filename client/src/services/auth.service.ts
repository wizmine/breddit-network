import { axiosClassic } from "../api/interceptors";
import { IAuthResponse } from "../types/auth.types";
import { saveTokenStorage } from "./auth-token.service";

export const authService = {
  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>("/auth/login/access-token");

    if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

    return response;
  },
};
