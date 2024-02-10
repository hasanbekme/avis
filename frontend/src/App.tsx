import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./Context/AuthProvider";
import { Login } from "./Pages/Login/Login";
import { ProtectedRotueUser } from "./Context/ProtectedRoute";
import SignUp from "./Pages/SignUp/SignUp";
import useAuth from "./Hooks/useAuth";
import { useEffect } from "react";
import UserIndex from "./Pages/User/Quizes/Grid";
import ProfileUser from "./Pages/User/Profile";
import UserContent from "./Pages/Layout/User/Content";
import { LoadScript } from "@react-google-maps/api";

export const queryClient = new QueryClient();

const LogOut = () => {
	const { logoutUser } = useAuth();

	useEffect(() => {
		logoutUser();
	}, [logoutUser]);

	return <Navigate to="/login" replace={true} />;
};

function App() {
	return (
			<Router>
				<AuthProvider>
					<LoadScript googleMapsApiKey="AIzaSyC3Fuoe2tcmIserrzJm4Y1i4p6x3Zqatrc">
						<QueryClientProvider client={queryClient}>
							<Routes>
								<Route
									path="/"
									element={
										<Navigate to="/user" replace={true} />
									}
								/>
								<Route path="/logout" element={<LogOut />} />
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<SignUp />} />
								<Route
									path="/user"
									element={<ProtectedRotueUser />}
								>
									<Route index element={<UserIndex />} />
									<Route
										path="profile"
										element={
											<UserContent>
												<ProfileUser />
											</UserContent>
										}
									/>
								</Route>
							</Routes>
						</QueryClientProvider>
					</LoadScript>
				</AuthProvider>
			</Router>
	);
}

export default App;
