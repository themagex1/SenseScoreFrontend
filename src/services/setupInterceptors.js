import axiosR from "./api";
import TokenService from "./token.service";

const setup = (store) => {
  axiosR.interceptors.request.use(
      (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
          config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end

        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
  );

  axiosR.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "api/Account/login" && err.response) {
          if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            if (!store.state.isRefreshing) {
              store.dispatch('setIsRefreshing', true);
              try {
                const rs = await axiosR.post("api/Account/refresh", {
                  refresh_token: TokenService.getLocalRefreshToken(),
                });

                const {accessToken} = rs.data;

                store.dispatch('auth/refreshToken', accessToken);
                TokenService.updateLocalAccessToken(rs.data.access_token);
                TokenService.updateLocalRefreshToken(rs.data.refresh_token);
                store.dispatch('setIsRefreshing', false);
                return axiosR(originalConfig);
              } catch (_error) {
                store.dispatch('setIsRefreshing', false);
                return Promise.reject(_error);
              }
            }
            else {
              const intervalId = setInterval(() => {
                if (!store.state.isRefreshing) {
                  clearInterval(intervalId);
                  return axiosR(originalConfig);
                }
              }, 100);
            }
          }
        }

        return Promise.reject(err);
      }
  );
};

export default setup;