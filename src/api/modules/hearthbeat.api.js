import privateClient from "../client/private.client";

const hearthBeatEndpoints = {
  addHB: "esp/add_hb",
  getHB: "esp/get_hb",
  getHBCbb: "esp/get_hb_cbb",
  updateHbStatus: "esp/update_hb_status"
};

const hearthBeatApi = {
  addPatient: async (patient) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.addHB, {
        patient
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getAllHB: async () => {
    try {
      const response = await privateClient.get(hearthBeatEndpoints.getHB);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getAllHBCbb: async (selectedHospital) => {
    try {
      const responseHB = await privateClient.post(hearthBeatEndpoints.getHBCbb,
        {
          selectedHospital
        });
      return { responseHB };
    } catch (error) {
      return { error };
    }
  },
  updateHbStatus: async (id, status) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.updateHbStatus,{
        id,
        status
      });
      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default hearthBeatApi;
