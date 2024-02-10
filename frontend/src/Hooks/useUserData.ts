import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "../Api/axios";

export type UserType = {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	grade: number;
	picture: string | null;
	is_superuser: boolean;
};

const useUserData = () => {
	const { tokens } = useAuth();

	const [user, setUser] = useState<UserType | null>(null);

	const updateUserData = async () => {
		if (!tokens?.access) {
			setUser(null);
		}
		const response: any = await axios.get("/account/me/", {
         headers: {
            "Authorization": "Bearer " + tokens?.access
         }
      });
		if (response.status === 200) {
			const data = response.data;
			setUser(data);
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		updateUserData();
	}, []);

	return {
      userData: user,
      updateUserData: updateUserData,
   };
};

export default useUserData;
