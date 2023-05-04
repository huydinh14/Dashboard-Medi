import privateClient from "../client/private.client";

const hospitalEndpoints = {
    getAll: "hospital/get_all",
    getAllCBB: "hospital/get_all_cbb",
    getAllTop5Device: "hospital/get_all_top_5_device",
    addHospital: "hospital/add_hospital",
    updateHospital: "hospital/update_hospital",
    deleteHospital: "hospital/delete_hospital"
}

const hospitalApi = {
     getAll: async () => {
        try {
            const response = await privateClient.get(hospitalEndpoints.getAll);
            return { response };
        } catch (error) {
            return { error };
        }
    },
    getAllCbb: async () => {
        try {
            const responseHospital = await privateClient.get(hospitalEndpoints.getAllCBB);
            return { responseHospital };
        } catch (error) {
            return { error };
        }
    },
    getAllTop5Device: async () => {
        try {
            const response = await privateClient.get(hospitalEndpoints.getAllTop5Device);
            return { response };
        } catch (error) {
            return { error };
        }
    },
    addHospital: async (name, address, phone) => {
        try {
          const response = await privateClient.post(hospitalEndpoints.addHospital, {
            name, address, phone
          });
          return { response };
        } catch (error) {
          return { error };
        }
      },
      updateHospital: async (hospitalUD) => {
        try {
          const response = await privateClient.post(hospitalEndpoints.updateHospital, {
            hospitalUD
          });
          return { response };
        } catch (error) {
          return { error };
        }
      },
      deleteHospital: async (id) => {
        try {
          const response = await privateClient.post(hospitalEndpoints.deleteHospital, {
            id
          });
          return { response };
        } catch (error) {
          return { error };
        }
      }
}

export default hospitalApi;