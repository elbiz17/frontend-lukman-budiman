import { BASE_URL } from "@/constants/constants";

const datasHarboursService = {
  getCountry: async () => {
    const response = await fetch(`${BASE_URL}/negaras`);
    const resJson = await response.json();
    return resJson;
  },
  getHarbours: async (filter: { where: { id_negara: string } }) => {
    const params = new URLSearchParams();
    if (filter) {
      params.append("filter", JSON.stringify(filter));
    }
    const response = await fetch(`${BASE_URL}/pelabuhans?${params}`);
    const resJson = await response.json();
    return resJson;
  },
  getItems: async (filter: { where: { id_pelabuhan: string } }) => {
    const params = new URLSearchParams();
    if (filter) {
      params.append("filter", JSON.stringify(filter));
    }
    const response = await fetch(`${BASE_URL}/barangs?${params}`);
    const resJson = await response.json();
    return resJson;
  },
};

export default datasHarboursService;
