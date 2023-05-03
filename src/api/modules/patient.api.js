import privateClient from "../client/private.client";

const patientEndpoints = {
    addPatient: "patient/add_patient",
    getAll: "patient/get_all",
    getInactive: "patient/get_inactive",
    getPatientById: "patient/get_patient_by_id",
    updatePatientStatus: "patient/update_patient_status",
    getPatientTopHB: "patient/get_patient_top_hb",
}

const patientApi = {
    addPatient: async (patient) => {
        try {
          const response = await privateClient.post(patientEndpoints.addPatient, patient);
          return { response };
        } catch (error) {
          return { error };
        }
      },
     getAll: async () => {
        try {
            const response = await privateClient.get(patientEndpoints.getAll);
            return { response };
        } catch (error) {
            return { error };
        }
    },
    getPatientInActive: async () => {
        try {
            const response = await privateClient.get(patientEndpoints.getInactive);
            return { response };
        } catch (error) {
            return { error };
        }
    },
    getPatientById: async (id) => {
        try {
            const response = await privateClient.post(patientEndpoints.getPatientById,{
                id
            });
            return { response };
        } catch (error) {
            return { error };
        }
    },
    updatePatientStatus: async (id, status) => {
        try {
            const response = await privateClient.post(patientEndpoints.updatePatientStatus,{
                id,
                status
            });
            return { response };
        } catch (error) {
            return { error };
        }
    },
    getPatientTopHB : async () => {
        try {
            const response = await privateClient.get(patientEndpoints.getPatientTopHB);
            return { response };
        } catch (error) {
            return { error };
        }
    },
}

export default patientApi;