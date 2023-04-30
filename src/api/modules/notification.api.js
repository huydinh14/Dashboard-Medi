import privateClient from "../client/private.client";

const notificationEndpoints = {
    getAll: "warning/get_warning",
}

const notificationApi = {
     getAll: async () => {
        try {
            const response = await privateClient.get(notificationEndpoints.getAll);
            return { response };
        } catch (error) {
            return { error };
        }
    }
}

export default notificationApi;