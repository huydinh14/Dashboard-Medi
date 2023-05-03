import privateClient from "../client/private.client";

const hearthBeatEndpoints = {
  addHB: "esp/add_hb",
  getHB: "esp/get_hb",
  getHBCbb: "esp/get_hb_cbb",
  updateHbStatus: "esp/update_hb_status",
  updateHbPatientCCCD: "esp/update_hb_patient_cccd",
  getHBFromIPMac: "esp/get_hb_from_ip_mac",
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
  }
};

export default hearthBeatApi;
