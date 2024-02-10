import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useCurrentDateTime } from "../../../Hooks/useDatetime";
import { useEffect, useState } from "react";
import { queryClient } from "../../../App";
import { GoogleMap, Marker } from "@react-google-maps/api";
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Accordion,
	Button,
	AccordionHeader,
	Chip,
	Tabs,
	AccordionBody,
	TabsHeader,
	TabsBody,
	Tab,
	Dialog,
	DialogBody,
	DialogHeader,
	TabPanel,
	DialogFooter,
} from "@material-tailwind/react";
import {
	PresentationChartBarIcon,
	ShoppingBagIcon,
	UserCircleIcon,
	ChevronRightIcon,
	CheckCircleIcon,
	Cog6ToothIcon,
	ChevronDownIcon,
	InboxIcon,
	PowerIcon,
} from "@heroicons/react/24/solid";
import {
	DisasterType,
	getDisasterList,
	DisasterCategoryType,
	getDisasterTypeList,
	StoryType,
	getStoryList,
	DonationType,
} from "../../../Api/apiManagers";
import axios from "../../../Api/axios";

const Index = () => {
	const axiosPrivate = axios;
	const [disasters, setDisasters] = useState<DisasterType[]>([]);
	const [disasterTypes, setDisasterTypes] = useState<DisasterCategoryType[]>(
		[]
	);
	const [selectedDonatationOrg, setSelectedDonationOrg] =
		useState<DonationType>();
	const [openDonateDialog, setOpenDonateDialog] = useState(false);
	const handleOpenDialog = () => setOpenDonateDialog(!openDonateDialog);
	const [stories, setStories] = useState<StoryType[]>([]);
	const [mapCenter, setMapCenter] = useState({ lat: 45, lng: 50 });
	const [selectedDisaster, setSelectedDisaster] = useState<
		number | undefined
	>();

	const [open, setOpen] = useState(0);
	const handleOpen = (value: number) => {
		setOpen(open === value ? 0 : value);
	};
	const handleOpenDisaster = (value: number) => {
		setSelectedDisaster(selectedDisaster === value ? undefined : value);
	};

	const updateDisasterData = async () => {
		const disasterData = await getDisasterList(axiosPrivate);
		console.log(disasterData);
		setDisasters(disasterData);
	};

	const updateDisasterTypeData = async () => {
		const disasterData = await getDisasterTypeList(axiosPrivate);
		console.log(disasterData);
		setDisasterTypes(disasterData);
	};

	const updateStoriesData = async () => {
		const storiesData = await getStoryList(axiosPrivate);
		console.log(storiesData);
		setStories(storiesData);
	};

	useEffect(() => {
		updateDisasterData();
		updateDisasterTypeData();
		updateStoriesData();
	}, []);

	return (
		<div className="flex flex-row gap-14 m-10">
			<Dialog open={openDonateDialog} handler={handleOpenDialog}>
				<DialogHeader>Donate now</DialogHeader>
				<DialogBody>
					<b>{selectedDonatationOrg?.charity.name}</b>About Donation
					organization: {selectedDonatationOrg?.charity.description}
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleOpenDialog}
						className="mr-1"
					>
						<span>Cancel</span>
					</Button>
					<Button variant="gradient" color="green">
						<a href={selectedDonatationOrg?.link}>Donate now</a>
					</Button>
				</DialogFooter>
			</Dialog>
			<GoogleMap
				options={{ draggable: true }}
				mapContainerStyle={{
					width: "70vw",
					height: "80vh",
				}}
				center={mapCenter}
				zoom={3}
			>
				{disasters.map((disaster) => (
					<Marker
						onClick={() => {
							setSelectedDisaster(disaster.id);
						}}
						icon={{
							url: disaster.disaster_type.icon,
							scaledSize: new window.google.maps.Size(50, 50),
						}}
						key={disaster.id}
						position={{
							lat: disaster.latitude,
							lng: disaster.longitude,
						}}
					/>
				))}
			</GoogleMap>
			<Card className="h-80vh max-w-lg p-4 shadow-xl shadow-blue-gray-900/5">
				<Tabs value="disaster">
					<TabsHeader>
						<Tab key="disaster" value="disaster">
							Disasters
						</Tab>
						<Tab key="stories" value="stories">
							Stories
						</Tab>
					</TabsHeader>
					<TabsBody className="overflow-y-scroll h-[calc(78vh)]">
						<TabPanel key="disaster" value="disaster">
							<List defaultValue={selectedDisaster}>
								{disasters.map((disaster) => (
									<Accordion
										open={selectedDisaster === disaster.id}
										icon={
											<ChevronDownIcon
												strokeWidth={2.5}
												className={`mx-auto h-4 w-4 transition-transform ${
													selectedDisaster ===
													disaster.id
														? "rotate-180"
														: ""
												}`}
											/>
										}
									>
										<ListItem
											key={disaster.id}
											onClick={() => {
												setMapCenter({
													lat: disaster.latitude,
													lng: disaster.longitude,
												});
											}}
										>
											<ListItemPrefix>
												<img
													className="w-10 h-10 object-cover object-center"
													src={
														disaster.disaster_type
															.icon
													}
													alt="something"
												/>
											</ListItemPrefix>
											<AccordionHeader
												onClick={() =>
													handleOpenDisaster(
														disaster.id
													)
												}
												className="border-b-0"
											>
												<Typography
													color="blue-gray"
													className="mr-auto font-normal"
												>
													{disaster.name}
												</Typography>
											</AccordionHeader>
										</ListItem>
										<AccordionBody className="py-1">
											{disaster.media.map((media) => (
												<img
													src={media.source}
													alt="story"
													className="w-auto h-auto"
												/>
											))}
											{disaster.donations.map(
												(donation) => (
													<Button
														color="red"
														className="w-full mt-4"
														onClick={() => {
															setSelectedDonationOrg(
																donation
															);
															handleOpenDialog();
														}}
													>
														Donate now
													</Button>
												)
											)}
										</AccordionBody>
									</Accordion>
								))}
							</List>
						</TabPanel>

						<TabPanel key="stories" value="stories">
							<List defaultValue={selectedDisaster}>
								{stories.map((story) => (
									<Accordion
										open={open === story.id}
										icon={
											<ChevronDownIcon
												strokeWidth={2.5}
												className={`mx-auto h-4 w-4 transition-transform ${
													open === story.id
														? "rotate-180"
														: ""
												}`}
											/>
										}
									>
										<ListItem
											className="p-0"
											selected={open === story.id}
										>
											<AccordionHeader
												onClick={() =>
													handleOpen(story.id)
												}
												className="border-b-0"
											>
												<ListItemPrefix>
													<img
														src={
															story.profile
																.picture
														}
														alt="profile"
														className="min-h-6 min-w-6"
													/>
												</ListItemPrefix>
												<Typography
													color="blue-gray"
													className="mr-auto font-normal"
												>
													<b>
														{story.profile
															.first_name +
															" " +
															story.profile
																.last_name}
													</b>
													{"   " +
														story.text.slice(0, 80)}
												</Typography>
											</AccordionHeader>
										</ListItem>
										<AccordionBody className="py-1">
											<Typography
												color="blue-gray"
												className="mr-auto font-normal"
											>
												{story.text}
											</Typography>
											<img
												src={story.image}
												alt="story"
												className="mt-2 w-auto h-auto"
											/>
											<Button
												color="red"
												className="mt-4 w-full"
											>
												Donate
											</Button>
										</AccordionBody>
									</Accordion>
								))}
							</List>
						</TabPanel>
					</TabsBody>
				</Tabs>
				<Button color="blue">Post</Button>
			</Card>
		</div>
	);
};

export default Index;
