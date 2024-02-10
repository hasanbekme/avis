import axios from "../Api/axios";
import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export type UserType = {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	grade: number;
	picture?: string;
	is_superuser: boolean;
	is_staff: boolean;
};

type TokenShape = {
	access: string;
	refresh: string;
};

export type AuthContextType = {
	user: UserType | null;
	loginUser: (username: string, password: string) => void;
	logoutUser: () => void;
	tokens: TokenShape | null;
	setAuthTokens: (data: TokenShape | null) => void;
	updateUserData: () => void;
};

type AuthProps = {
	children: any;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const LOGIN_URL = "/account/token/";

export const AuthProvider = ({ children }: AuthProps) => {
	const [tokens, setTokens] = useState<TokenShape | null>(
		localStorage.getItem("authTokens")
			? (JSON.parse(
					localStorage.getItem("authTokens") || "{}"
			  ) as TokenShape)
			: null
	);

	const [user, setUser] = useState<UserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const updateUserData = async () => {
		if (!tokens?.access) {
			setUser(null);
			setIsLoading(false);
		}
		const response: any = await axios.get("/account/me/", {
			headers: {
				Authorization: "Bearer " + tokens?.access,
			},
		});
		if (response.status === 200) {
			const data = response.data;
			setUser(data);
		} else {
			setUser(null);
		}
		setIsLoading(false);
	};

	const setAuthTokens = (data: TokenShape | null) => {
		if (!data) {
			localStorage.removeItem("authTokens");
			return;
		}
		localStorage.setItem("authTokens", JSON.stringify(data));
		setTokens(data);
	};

	const loginUser = async (username: string, password: string) => {
		const response: any = await axios.post(LOGIN_URL, {
			username: username,
			password: password,
		});
		if (response.status === 200) {
			const data = response.data;
			setAuthTokens(data);
		}
	};

	useEffect(() => {
		axios.interceptors.response.use(
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
								const response = await axios.post(
									"/account/token/refresh/",
									{
										refresh: tokens?.refresh,
									}
								);
								const data = response.data;
								setAuthTokens(data);
								return axios(originalConfig);
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
	});

	useEffect(() => {
		if (!tokens?.access) {
			setIsLoading(false);
			return;
		}
		updateUserData();
	}, [tokens]);

	const logoutUser = () => {
		localStorage.removeItem("authTokens");
		setAuthTokens(null);
		setUser(null);
		setIsLoading(false);
	};

	const ContextData = {
		user: user,
		loginUser: loginUser,
		logoutUser: logoutUser,
		tokens: tokens,
		setAuthTokens: setAuthTokens,
		updateUserData: updateUserData,
	};

	if (isLoading) {
		return <div>Loading...</div>; // Render a loading spinner or some other placeholder
	}

	return (
		<AuthContext.Provider value={ContextData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
