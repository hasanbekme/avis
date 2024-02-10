export type DisasterCategoryType = {
	id: number;
	name: string;
	icon: string;
};

export type DisasterType = {
	id: number;
	name: string;
	type: string;
	latitude: number;
	longitude: number;
	text: string;
	disaster_type: DisasterCategoryType;
	media: MediaType[];
	donations: DonationType[];
};

export type MediaType = {
	id: number;
	pub_date: string;
	disaster: number;
	source: string;
};

export type ProfileType = {
	id: number;
	first_name: string;
	last_name: string;
	picture: string;
};

export type StoryType = {
	id: number;
	profile: ProfileType;
	text: string;
	image: string;
};

export type CharityType = {
	id: number;
	name: string;
	description: string;
};

export type DonationType = {
	id: number;
	charity: CharityType;
	disaster: number;
	link: string;
};

const getDisasterList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-disaster/", {});
	if (response.status === 200) {
		return response.data;
	}
};

const getDisasterTypeList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-disaster-type/", {});
	if (response.status === 200) {
		return response.data;
	}
};

const getMediaList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-media/", {});
	if (response.status === 200) {
		return response.data;
	}
};

const getStoryList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-story/", {});
	if (response.status === 200) {
		return response.data;
	}
};

const getCharityList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-charity/", {});
	if (response.status === 200) {
		return response.data;
	}
};

const getDonationList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-donation/", {});
	if (response.status === 200) {
		return response.data;
	}
};

export {
	getDisasterList,
	getDisasterTypeList,
	getMediaList,
	getStoryList,
	getCharityList,
	getDonationList,
};
