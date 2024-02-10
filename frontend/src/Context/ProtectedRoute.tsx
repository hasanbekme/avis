import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import UserNavbar from "../Pages/Layout/User/Navbar";

export const ProtectedRotueUser = () => {
	let { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" replace={true} />;
	}

	if (user.is_staff) {
		return <Navigate to="/admin" replace={true} />;
	}

	return (
		<div className="mx-auto h-screen">
			<UserNavbar />
			<div className="flex h-[calc(100vh-6rem)]">
				<Outlet />
			</div>
		</div>
	);
};
