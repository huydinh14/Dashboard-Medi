import privateClient from "../client/private.client";

const userEndpoints = {
  getMediaRecord: "mediaRecord/get_media_record",
  addMediaRecord: "mediaRecord/add_media_record",
  predictor: "mediaRecord/predictor",
};

const mediaRecordApi = {
  getMediaRecord: async (date_start, date_end) => {
    try {
      const response = await privateClient.post(userEndpoints.getMediaRecord, {
        date_start,
        date_end,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  addMediaRecord: async (mediaRecordFN) => {
    try {
      const response = await privateClient.post(userEndpoints.addMediaRecord, {
        mediaRecordFN,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  predictor: async (idMed) => {
    try {
      const response = await privateClient.post(userEndpoints.predictor, {
        idMed,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default mediaRecordApi;