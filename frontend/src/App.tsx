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
import UserNavbar from "../src/Pages/Layout/User/Navbar";

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
									<div
										className="mx-auto h-screen"
										style={{ 
											backgroundColor: "antiquewhite" 
										}}
									>
										<UserNavbar />
										<div className="flex h-[calc(100vh-6rem)]">
											<UserIndex />
										</div>
									</div>
								}
							/>
							<Route path="/logout" element={<LogOut />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<SignUp />} />
							<Route
								path="/user"
								element={<ProtectedRotueUser />}
							>
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
