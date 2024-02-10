import { axiosPrivate } from "../Api/axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
	const { logoutUser, tokens, setAuthTokens } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config: any) => {
				const token = tokens?.access;
				if (token) {
					if (!config.headers) return;
					config.headers["Authorization"] = "Bearer " + token;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(res) => res,
			async (error) => {
				const originalConfig = error.config;
				if (error.response) {
					if (
						error.response.status === 401 &&
						!originalConfig._retry
					) {
						const errorData = error.response.data;
						// Access Token Expired
						if (errorData.messages && errorData.messages[0].token_type === "access") {
							originalConfig._retry = true;
							try {
								const response = await axiosPrivate.post(
									"/account/token/refresh/",
									{
										refresh: tokens?.refresh,
									}
								);
								const data = response.data;
								setAuthTokens(data);
								return axiosPrivate(originalConfig);
							} catch (_error) {
								logoutUser();
								navigate("/login");
								return Promise.reject(_error);
							}
						}
						// Invalid Refresh Token
						else {
							logoutUser();
							navigate("/login");
							return Promise.reject(error);
						}
					}
				}
				return Promise.reject(error);
			}
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [tokens, setAuthTokens, navigate, logoutUser]);

	return axiosPrivate;
};

export default useAxiosPrivate;
