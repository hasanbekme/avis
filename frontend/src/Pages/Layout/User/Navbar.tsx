import { useState } from "react";
import {
	Typography,
	Button,
	Menu,
	MenuHandler,
	Avatar,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";

import {
	UserCircleIcon,
	ChevronDownIcon,
	PowerIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserType } from "../../../Context/AuthProvider";

type Props = {
	user: UserType | null;
	logoutUser: () => void;
};

const ProfileMenu = ({ user, logoutUser }: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
			<MenuHandler>
				<Button
					variant="text"
					color="blue-gray"
					className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
				>
					<Avatar
						variant="circular"
						size="md"
						alt="profile image"
						className="border border-blue-500 p-0.1"
						src={
							user?.picture ? user.picture : "/assets/profile.png"
						}
					/>
					<Typography
						as="span"
						variant="small"
						className="font-sans"
						color="black"
					>
						{user?.first_name + " " + user?.last_name}
					</Typography>
					<ChevronDownIcon
						strokeWidth={2.5}
						className={`h-3 w-3 transition-transform ${
							isMenuOpen ? "rotate-180" : ""
						}`}
					/>
				</Button>
			</MenuHandler>
			<MenuList className="p-1">
				<MenuItem
					className="flex items-center gap-2 rounded"
					onClick={() => navigate("/user/profile")}
				>
					<UserCircleIcon className="h-4 w-4" />
					<Typography
						as="span"
						variant="small"
						className="font-formal"
						color="inherit"
					>
						My Profile
					</Typography>
				</MenuItem>
				<MenuItem
					className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
					onClick={() => {
						logoutUser();
						navigate("/login");
					}}
				>
					<PowerIcon className="h-4 w-4" color="red" />
					<Typography
						as="span"
						variant="small"
						className="font-formal"
						color="red"
					>
						Sign out
					</Typography>
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default function CustomNavbar() {
	const { user, logoutUser } = useAuth();
	return (
		<nav className="drop-shadow-xl p-2 pl-5 pr-5 border-gray-200 bg-gray-50 dark:bg-gray-200 sticky top-0 z-50">
			<div className="flex items-center justify-between text-blue-gray-900">
				<Link
					to={"/user"}
					className="cursor-pointer text-2xl font-bold"
				>
					Avis
				</Link>

				{user ? (
					<ProfileMenu user={user} logoutUser={logoutUser} />
				) : (
					<div className="text-align-right">
						<Link
							to="/login"
							className="cursor-pointer text-xl font-bold text-blue-500 hover:text-blue-700"
						>
							Login
						</Link>
						<Link
							to="/signup"
							className="ml-10 cursor-pointer text-xl font-bold text-blue-500 hover:text-blue-700"
						>
							Sign Up
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
}
