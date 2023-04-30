import privateClient from "../client/private.client";

const userEndpoints = {
  getDoctor: "doctor/get_doctor",
  getAllDoctor: "doctor/get_all_doctor",
  getAllDoctorCBB: "doctor/get_all_doctor_cbb",
  addDoctor: "doctor/add_doctor"
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
    console.log("🚀 ~ file: doctor.api.js:36 ~ addDoctor: ~ doctorNew:", doctorNew)
    try {
      const response = await privateClient.post(userEndpoints.addDoctor, {
        doctorNew
      });
      return { response };
    } catch (error) {
      return { error };
    }
  }
};

export default doctorApi;
