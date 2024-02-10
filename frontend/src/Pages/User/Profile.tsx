import {
	Button,
	Card,
	CardBody,
	Input,
	Avatar,
	CardHeader,
	Alert,
} from "@material-tailwind/react";
import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import axios from "../../Api/axios";
import useAuth from "../../Hooks/useAuth";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

type userFormType = {
	first_name: string;
	last_name: string;
	username: string;
};

const Profile = () => {
	const { user, updateUserData } = useAuth();
	const axiosPrivate = useAxiosPrivate();

	const [userForm, setUserForm] = useState<userFormType>({
		first_name: user?.first_name,
		last_name: user?.last_name,
		username: user?.username,
	} as userFormType);

	const [passwordForm, setPasswordForm] = useState({
		current_password: "",
		new_password: "",
		new_password_confirm: "",
	});

	const [alert, setAlert] = useState({
		showAlert: false,
		isGreen: true,
		message: "",
	});

	const userFormReady =
		userForm.first_name.length > 2 &&
		userForm.last_name.length > 2 &&
		userForm.username.length > 2;

	const passwordFormReady =
		passwordForm.current_password.length > 2 &&
		passwordForm.new_password.length > 2 &&
		passwordForm.new_password === passwordForm.new_password_confirm;


	const fileInput = useRef<HTMLInputElement>(null);

	const handleAvatarClick = () => {
		fileInput.current?.click();
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setUserForm({
			...userForm,
			[name]: value,
		});
	};

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPasswordForm({
			...passwordForm,
			[name]: value,
		});
	};

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) {
			return;
		}
		const formData = new FormData();
		formData.append("picture", file);
		const response = await axiosPrivate.put(
			"/account/update-profile-picture/",
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			}
		);
		if (response.status === 200) {
			updateUserData();
		}
		event.target.value = "";
	};

	const handleUserInfoSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axiosPrivate.put(
				"/account/update-profile/",
				userForm
			);
			if (response.status === 200) {
				setAlert({
					...alert,
					isGreen: true,
					showAlert: true,
					message: "Your profile has been updated",
				});
				updateUserData();
			}
		} catch {
			setAlert({
				...alert,
				showAlert: true,
				isGreen: false,
				message: "There has been an error or new username is already exist",
			});
		}
	};

	const handlePasswordChangeSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axiosPrivate.put(
				"/account/change-password/",
				passwordForm
			);
			if (response.status === 200) {
				setAlert({
					...alert,
					showAlert: true,
					isGreen: true,
					message: "Your password has been changed",
				});
				setPasswordForm({
					current_password: "",
					new_password: "",
					new_password_confirm: "",
				});
			}
		} catch {
			setAlert({
				...alert,
				showAlert: true,
				isGreen: false,
				message:
					"Current password is wrong, please enter the correct password",
			});
		}
	};

	return (
		<div className="flex justify-center items-center mt-8">
			<Card className="w-auto drop-shadow-2xl">
				<CardHeader
					variant="filled"
					color="transparent"
					className="grid h-18 place-items-center shadow-none"
				>
					<Avatar
						variant="circular"
						size="xxl"
						alt="profile image"
						className="border border-2 border-blue-500 p-0.5 cursor-pointer duration-100 hover:opacity-70 active:opacity-100"
						src={user?.picture ? user.picture : "/assets/profile.png"}
						onClick={handleAvatarClick}
					/>
					<input
						type="file"
						accept="image/*"
						ref={fileInput}
						style={{ display: "none" }}
						onChange={handleFileChange}
					/>
				</CardHeader>
				<CardBody className="grid grid-cols-2 gap-10 p-10 pt-5 ">
					<Alert
						variant="outlined"
						open={alert.showAlert}
						color={alert.isGreen ? "green" : "red"}
						onClose={() => setAlert({ ...alert, showAlert: false })}
						className="col-span-2"
					>
						{alert.message}
					</Alert>
					<form
						className="flex flex-col gap-4"
						onSubmit={handleUserInfoSubmitForm}
					>
						<h2 className="font-bold mb-2">Personal Info</h2>
						<Input
							type="text"
							label="First Name"
							name="first_name"
							value={userForm.first_name}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label="Last Name"
							name="last_name"
							value={userForm.last_name}
							onChange={handleChange}
						/>
						<Input
							type="text"
							label="Username"
							name="username"
							value={userForm.username}
							onChange={handleChange}
						/>
						<Button type="submit" disabled={!userFormReady}>
							Save Personal Info
						</Button>
					</form>

					<form
						className="flex flex-col gap-4"
						onSubmit={handlePasswordChangeSubmitForm}
					>
						<h2 className="font-bold mb-2">Update Password</h2>
						<Input
							type="password"
							label="Current Password"
							name="current_password"
							value={passwordForm.current_password}
							onChange={handleChangePassword}
						/>
						<Input
							type="password"
							label="New Password"
							name="new_password"
							value={passwordForm.new_password}
							onChange={handleChangePassword}
						/>
						<Input
							type="password"
							label="Confirm New Password"
							name="new_password_confirm"
							value={passwordForm.new_password_confirm}
							onChange={handleChangePassword}
						/>
						<Button type="submit" disabled={!passwordFormReady}>
							Save New Password
						</Button>
					</form>
				</CardBody>
			</Card>
		</div>
	);
};

export default Profile;
