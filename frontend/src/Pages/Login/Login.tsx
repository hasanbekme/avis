import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";

type Props = {};

export const validateUsername = (username: string) => {
	return !(username === "");
};

export const validatePassword = (pwd: string) => {
	return !(pwd === "");
};

export const Login = (props: Props) => {
	const navigate = useNavigate();
	const { loginUser, user } = useAuth();

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);

	const [readyToSubmit, setReadyToSubmit] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [showError, setShowError] = useState(true);

	useEffect(() => {
		const validation = validateUsername(username);
		setValidUsername(validation);
	}, [username]);

	useEffect(() => {
		const validation = validatePassword(password);
		setValidPassword(validation);
	}, [password]);

	useEffect(() => {
		setReadyToSubmit(validUsername && validPassword);
	}, [validUsername, validPassword]);

	const submitForm = async (e: any) => {
		e.preventDefault();
		if (!readyToSubmit) return;
		try {
			setReadyToSubmit(false);
			await loginUser(username, password);
		} catch (error) {
			setErrMsg("Please check your credentials and try again.");
			setShowError(true);
			setReadyToSubmit(true);
		}
	};

	useEffect(() => {
		if (user) {
			user.is_staff ? navigate("/admin") : navigate("/");
		}
	});

	return (
		<div className="flex justify-center items-center h-screen">
			<Card className="w-96 drop-shadow-2xl">
				<CardHeader
					variant="gradient"
					color="blue"
					className="mb-4 grid h-16 place-items-center"
				>
					<Typography variant="h4" color="white">
						Sign In
					</Typography>
				</CardHeader>
				<form onSubmit={submitForm}>
					<CardBody className="flex flex-col gap-4">
						{errMsg && (
							<Alert
								variant="outlined"
								open={showError}
								action={
									<Button
										variant="text"
										color="red"
										size="sm"
										className="!absolute top-1 right-1"
										onClick={() => setShowError(false)}
									>
										x
									</Button>
								}
								className="text-sm h-10 p-2"
								color="red"
							>
								Check your login credentials and try again.
							</Alert>
						)}
						<Input
							label="Username"
							onChange={(e: any) => setUsername(e.target.value)}
							size="lg"
						/>
						<Input
							type="password"
							label="Password"
							onChange={(e: any) => setPassword(e.target.value)}
							size="lg"
						/>
						<Button
							variant="gradient"
							fullWidth
							type="submit"
							disabled={!readyToSubmit}
						>
							Sign In
						</Button>
					</CardBody>
				</form>
				<CardFooter className="pt-0">
					<Typography variant="small" className="mt-3 flex justify-center">
						Don't have an account?
						<Typography
							as="button"
							onClick={() => navigate("/signup")}
							variant="small"
							color="blue"
							className="ml-1 font-bold"
						>
							Sign up
						</Typography>
					</Typography>
				</CardFooter>
			</Card>
		</div>
	);
};
