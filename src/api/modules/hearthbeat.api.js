import privateClient from "../client/private.client";

const hearthBeatEndpoints = {
  getHB: "esp/get_hb",
  getHBCbb: "esp/get_hb_cbb"
};

const hearthBeatApi = {
  getAllHB: async () => {
    try {
      const response = await privateClient.get(hearthBeatEndpoints.getHB);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getAllHBCbb: async () => {
    try {
      const responseHB = await privateClient.get(hearthBeatEndpoints.getHBCbb);
      return { responseHB };
    } catch (error) {
      return { error };
    }
  }
};

export default hearthBeatApi;
