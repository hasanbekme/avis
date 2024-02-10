import { useEffect, useState } from "react";

export const useCurrentDateTime = () => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return currentDateTime;
};