import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useCurrentDateTime } from "../../../Hooks/useDatetime";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { queryClient } from "../../../App";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
} from "@material-tailwind/react";
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	UserCircleIcon,
	Cog6ToothIcon,
	InboxIcon,
	PowerIcon,
} from "@heroicons/react/24/solid";
import { DisasterType, getDisasterList } from "../../../Api/apiManagers";

const Index = () => {
	const axiosPrivate = useAxiosPrivate();
	const now = useCurrentDateTime();
	const [disasters, setDisasters] = useState<DisasterType[]>([]);
	const [mapCenter, setMapCenter] = useState({ lat: 45, lng: 50 });

	const updateDisasterData = async () => {
		const disasterData = await getDisasterList(axiosPrivate);
		console.log(disasterData);
		setDisasters(disasterData);
	};

	useEffect(() => {
		updateDisasterData();
	}, []);

	return (
		<div className="flex flex-col w-full m-10">
			<div className="flex flex-row">
				<div className="flex flex-col gap-5 sm:flex-row">
					<Button
						color="light-blue"
						className="rounded-full"
						onClick={() => {}}
					>
						All
					</Button>
					<Button
						color="yellow"
						className="rounded-full"
						onClick={() => {}}
					>
						Upcoming
					</Button>
					<Button
						color="light-green"
						className="rounded-full"
						onClick={() => {}}
					>
						Ongoing
					</Button>
					<Button
						color="gray"
						className="rounded-full"
						onClick={() => {}}
					>
						Finished
					</Button>
				</div>
			</div>
			<div className="flex flex-wrap gap-5 mt-5">
				<GoogleMap
					options={{ draggable: true }}
					mapContainerStyle={{
						width: "50vw",
						height: "75vh",
					}}
					center={mapCenter}
					zoom={6}
				>
					{disasters.map((disaster) => (
						<Marker
							key={disaster.id}
							position={{
								lat: disaster.latitude,
								lng: disaster.longitude,
							}}
						/>
					))}
				</GoogleMap>
				<Card className="h-[calc(80vh-2rem)] w-full max-w-[41rem] p-4 shadow-xl shadow-blue-gray-900/5">
					<div className="mb-2 p-4">
						<Typography variant="h5" color="blue-gray">
							Sidebar
						</Typography>
					</div>
					<List>
						{disasters.map((disaster) => (
							<ListItem key={disaster.id}>
								<ListItemPrefix>
									<ShoppingBagIcon className="h-5 w-5" />
								</ListItemPrefix>
								{disaster.name}
								<ListItemSuffix>
									<Chip value={5} color="light-green" />
								</ListItemSuffix>
							</ListItem>
						))}
					</List>
				</Card>
			</div>
		</div>
	);
};

export default Index;
