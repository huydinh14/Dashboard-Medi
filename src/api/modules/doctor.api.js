import privateClient from "../client/private.client";

const userEndpoints = {
  getDoctor: "doctor/get_doctor",
  getAllDoctor: "doctor/get_all_doctor",
  getAllDoctorCBB: "doctor/get_all_doctor_cbb",
  addDoctor: "doctor/add_doctor",
  updateDoctor: "doctor/update_doctor",
  deleteDoctor: "doctor/delete_doctor"
};

const doctorApi = {
  getDoctor: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getDoctor);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getAllDoctor: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getAllDoctor);
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getAllDoctorCBB: async () => {
    try {
      const responseDoctor = await privateClient.get(userEndpoints.getAllDoctorCBB);
      return { responseDoctor };
    } catch (error) {
      return { error };
    }
  },
  addDoctor: async (doctorNew) => {
    try {
      const response = await privateClient.post(userEndpoints.addDoctor, {
        doctorNew
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  updateDoctor: async (doctorUpdate) => {
    try {
      const response = await privateClient.put(userEndpoints.updateDoctor, {
        doctorUpdate
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  deleteDoctor: async (doctorId) => {
    try {
      const response = await privateClient.post(userEndpoints.deleteDoctor, {
        doctorId
      });
      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default doctorApi;
