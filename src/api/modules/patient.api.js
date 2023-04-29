import privateClient from "../client/private.client";

const patientEndpoints = {
    getAll: "patient/get_all",
    getInactive: "patient/get_inactive",
    getPatientById: "patient/get_patient_by_id"
}

const patientApi = {
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
}

export default patientApi;