export type DisasterType = {
	id: number;
	name: string;
	type: string;
	latitude: number;
	longitude: number;
	text: string;
};

// export type MediaType = {
// 	pub_date: string;
// 	disaster: ;
// };

const getDisasterList = async (axiosPrivate: any) => {
	const response = await axiosPrivate.get("/map/get-disaster/", {});
	if (response.status === 200) {
		return response.data;
	}
};

export { getDisasterList };
