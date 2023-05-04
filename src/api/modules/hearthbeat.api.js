import privateClient from "../client/private.client";

const hearthBeatEndpoints = {
  addHB: "esp/add_hb",
  getHB: "esp/get_hb",
  getHBCbb: "esp/get_hb_cbb",
  updateHbStatus: "esp/update_hb_status",
  updateHbPatientCCCD: "esp/update_hb_patient_cccd",
  getHBFromIPMac: "esp/get_hb_from_ip_mac",
  updateHB: "esp/update_hb",
  deleteHB: "esp/delete_hb",
};

const hearthBeatApi = {
  addHB: async (hb) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.addHB, {
        hb
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
  getHBFromIPMac: async (ip_mac) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.getHBFromIPMac, {
        ip_mac,
      });
      return { response };
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
  },
  updateHbPatientCCCD: async (id, cccd) => {
    try {
      const responseHNCCCD = await privateClient.post(hearthBeatEndpoints.updateHbPatientCCCD,{
        id,
        cccd
      });
      return { responseHNCCCD };
    } catch (error) {
      return { error };
    }
  },
  updateHB: async (hb) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.updateHB, {
        hb
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  deleteHB: async (id) => {
    try {
      const response = await privateClient.post(hearthBeatEndpoints.deleteHB, {
        id
      });
      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default hearthBeatApi;
