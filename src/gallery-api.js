import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = async (topic, currentPage) => {
  const response = await axios.get(`/search/photos/`, {
    params: {
      client_id: "Of8p7Qr9QoEXbJFq6kKj446vTwbTopcTrCIj37W7SHw",
      query: topic,
      page: currentPage,
      per_page: 18,
    },
  });
  return response.data;
};